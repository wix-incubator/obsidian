use std::collections::HashMap;
use swc_core::ecma::{
    ast::*,
    visit::{visit_mut_pass, VisitMut, VisitMutWith},
};
use swc_core::{
    common::Span,
    plugin::{plugin_transform, proxies::TransformPluginProgramMetadata},
};

pub struct DiTransformer {
    imports: HashMap<String, String>,
    used_imports: Vec<String>,
}

impl DiTransformer {
    pub fn new() -> Self {
        Self {
            imports: HashMap::new(),
            used_imports: Vec::new(),
        }
    }
}

impl VisitMut for DiTransformer {
    fn visit_mut_module(&mut self, module: &mut Module) {
        for item in &module.body {
            if let ModuleItem::ModuleDecl(ModuleDecl::Import(import_decl)) = item {
                let source = import_decl.src.value.to_string();

                for specifier in &import_decl.specifiers {
                    match specifier {
                        ImportSpecifier::Named(named_spec) => {
                            self.imports
                                .insert(named_spec.local.sym.to_string(), source.clone());
                        }
                        ImportSpecifier::Default(default_spec) => {
                            self.imports
                                .insert(default_spec.local.sym.to_string(), source.clone());
                        }
                        _ => {}
                    }
                }
            }
        }

        module.visit_mut_children_with(self);

        let mut imports_to_remove = vec![];
        for (idx, item) in module.body.iter().enumerate() {
            if let ModuleItem::ModuleDecl(ModuleDecl::Import(import_decl)) = item {
                let should_remove = import_decl.specifiers.iter().any(|spec| match spec {
                    ImportSpecifier::Named(named_spec) => self
                        .used_imports
                        .contains(&named_spec.local.sym.to_string()),
                    ImportSpecifier::Default(default_spec) => self
                        .used_imports
                        .contains(&default_spec.local.sym.to_string()),
                    _ => false,
                });

                if should_remove {
                    imports_to_remove.push(idx);
                }
            }
        }

        for idx in imports_to_remove.into_iter().rev() {
            module.body.remove(idx);
        }
    }

    fn visit_mut_class_member(&mut self, member: &mut ClassMember) {
        member.visit_mut_children_with(self);

        match member {
            ClassMember::Method(method) => {
                if let Some(provides_idx) = find_decorator(&method.function.decorators, "Provides")
                {
                    if let Some(method_name) = get_method_name(&method.key) {
                        transform_provides_decorator(
                            &mut method.function.decorators[provides_idx],
                            &method_name,
                        );
                        transform_method_params(&mut method.function);

                        add_requires_to_method(&mut method.function, self);
                    }
                }
            }
            ClassMember::ClassProp(prop) => {
                if let Some(inject_idx) = find_decorator(&prop.decorators, "Inject") {
                    if let Some(prop_name) = get_prop_name(&prop.key) {
                        transform_inject_decorator(&mut prop.decorators[inject_idx], &prop_name);
                    }
                }
            }
            _ => {}
        }
    }
}

fn find_decorator(decorators: &[Decorator], name: &str) -> Option<usize> {
    decorators.iter().position(|dec| {
        matches!(
            &*dec.expr,
            Expr::Call(CallExpr {
                callee: Callee::Expr(expr),
                ..
            }) if is_identifier(expr, name)
        ) || is_identifier(&dec.expr, name)
    })
}

fn is_identifier(expr: &Expr, name: &str) -> bool {
    matches!(
        expr,
        Expr::Ident(ident) if ident.sym.as_ref() == name
    )
}

fn get_method_name(key: &PropName) -> Option<String> {
    match key {
        PropName::Ident(i) => Some(i.sym.as_ref().to_string()),
        PropName::Str(s) => Some(s.value.as_ref().to_string()),
        _ => None,
    }
}

fn get_prop_name(key: &PropName) -> Option<String> {
    match key {
        PropName::Ident(i) => Some(i.sym.as_ref().to_string()),
        PropName::Str(s) => Some(s.value.as_ref().to_string()),
        _ => None,
    }
}

fn transform_provides_decorator(decorator: &mut Decorator, method_name: &str) {
    if let Expr::Call(call_expr) = &mut *decorator.expr {
        call_expr.args = vec![ExprOrSpread {
            spread: None,
            expr: Box::new(create_name_object(method_name, decorator.span)),
        }];
    }
}

fn transform_inject_decorator(decorator: &mut Decorator, property_name: &str) {
    if let Expr::Call(call_expr) = &mut *decorator.expr {
        call_expr.args = vec![ExprOrSpread {
            spread: None,
            expr: Box::new(Expr::Lit(Lit::Str(Str {
                span: decorator.span,
                value: property_name.into(),
                raw: None,
            }))),
        }];
    }
}

fn create_name_object(name: &str, span: Span) -> Expr {
    Expr::Object(ObjectLit {
        span,
        props: vec![PropOrSpread::Prop(Box::new(Prop::KeyValue(KeyValueProp {
            key: PropName::Ident(IdentName::new("name".into(), span)),
            value: Box::new(Expr::Lit(Lit::Str(Str::from(name)))),
        })))],
    })
}

fn transform_method_params(function: &mut Function) {
    if function.params.is_empty() {
        return;
    }

    let span = function.params[0].span;
    let properties = function
        .params
        .iter()
        .filter_map(|param| {
            if let Pat::Ident(ident) = &param.pat {
                Some(ObjectPatProp::Assign(AssignPatProp {
                    span,
                    key: BindingIdent {
                        id: ident.id.clone(),
                        type_ann: None,
                    },
                    value: None,
                }))
            } else {
                None
            }
        })
        .collect();

    function.params = vec![Param {
        span,
        decorators: vec![],
        pat: Pat::Object(ObjectPat {
            span,
            props: properties,
            optional: false,
            type_ann: None,
        }),
    }];
}

fn add_requires_to_method(function: &mut Function, transformer: &mut DiTransformer) {
    if let Some(BlockStmt { stmts, .. }) = &mut function.body {
        let mut requires = vec![];

        for (import_name, source) in &transformer.imports {
            if stmts
                .iter()
                .any(|stmt| stmt_contains_ident(stmt, import_name))
            {
                requires.push((import_name.clone(), source.clone()));
                transformer.used_imports.push(import_name.clone());
            }
        }

        for (import_name, source) in requires {
            stmts.insert(0, create_require_stmt(&import_name, &source));
        }
    }
}

fn stmt_contains_ident(stmt: &Stmt, ident_name: &str) -> bool {
    match stmt {
        Stmt::Return(ret_stmt) => {
            if let Some(expr) = &ret_stmt.arg {
                expr_contains_ident(expr, ident_name)
            } else {
                false
            }
        }
        _ => false,
    }
}

fn expr_contains_ident(expr: &Expr, ident_name: &str) -> bool {
    match expr {
        Expr::New(new_expr) => {
            if let Expr::Ident(ident) = &*new_expr.callee {
                ident.sym.as_ref() == ident_name
            } else {
                false
            }
        }
        _ => false,
    }
}
fn create_require_stmt(import_name: &str, source: &str) -> Stmt {
    Stmt::Decl(Decl::Var(Box::new(VarDecl {
        span: Default::default(),
        kind: VarDeclKind::Const,
        declare: false,
        ctxt: Default::default(),
        decls: vec![VarDeclarator {
            span: Default::default(),
            name: Pat::Ident(BindingIdent::from(Ident::new(
                import_name.into(),
                Default::default(),
                Default::default(),
            ))),
            init: Some(Box::new(Expr::Call(CallExpr {
                span: Default::default(),
                callee: Callee::Expr(Box::new(Expr::Ident(Ident::new(
                    "require".into(),
                    Default::default(),
                    Default::default(),
                )))),
                args: vec![ExprOrSpread {
                    spread: None,
                    expr: Box::new(Expr::Lit(Lit::Str(Str::from(source)))),
                }],
                type_args: None,
                ctxt: Default::default(),
            }))),
            definite: false,
        }],
    })))
}

#[plugin_transform]
pub fn process_transform(program: Program, _config: TransformPluginProgramMetadata) -> Program {
    program.apply(visit_mut_pass(DiTransformer::new()))
}
