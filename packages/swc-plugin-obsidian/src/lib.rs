use swc_core::common::{DUMMY_SP, Span};
use swc_core::ecma::{
    ast::*,
    visit::{as_folder, FoldWith, VisitMut, VisitMutWith},
};
use swc_core::plugin::{plugin_transform, proxies::TransformPluginProgramMetadata};

pub struct DiTransformer;

impl VisitMut for DiTransformer {
    // Visit class members to transform decorators
    fn visit_mut_class_member(&mut self, member: &mut ClassMember) {
        // First visit any child nodes
        member.visit_mut_children_with(self);

        match member {
            // Handle methods with @Provides decorator
            ClassMember::Method(method) => {
                if let Some(provides_idx) = find_decorator(&method.decorators, "Provides") {
                    // Transform the @Provides decorator
                    if let Some(method_name) = get_method_name(&method.key) {
                        transform_provides_decorator(&mut method.decorators[provides_idx], &method_name);
                        transform_method_params(&mut method.function);
                    }
                }
            }
            // Handle properties with @Inject decorator
            ClassMember::ClassProp(prop) => {
                if let Some(inject_idx) = find_decorator(&prop.decorators, "Inject") {
                    // Transform the @Inject decorator
                    if let Some(prop_name) = get_prop_name(&prop.key) {
                        transform_inject_decorator(&mut prop.decorators[inject_idx], &prop_name);
                    }
                }
            }
            _ => {}
        }
    }
}

// Helper function to find a decorator by name
fn find_decorator(decorators: &[Decorator], name: &str) -> Option<usize> {
    decorators.iter().position(|dec| {
        matches!(
            &dec.expr,
            Expr::Call(CallExpr {
                callee: Callee::Expr(expr),
                ..
            }) if is_identifier(expr, name)
        ) || is_identifier(&dec.expr, name)
    })
}

// Helper function to check if an expression is an identifier with given name
fn is_identifier(expr: &Expr, name: &str) -> bool {
    matches!(
        expr,
        Expr::Ident(ident) if ident.sym.to_string() == name
    )
}

// Get method name from PropOrPrivateName
fn get_method_name(key: &PropName) -> Option<String> {
    match key {
        PropName::Ident(i) => Some(i.sym.to_string()),
        PropName::Str(s) => Some(s.value.to_string()),
        _ => None,
    }
}

// Get property name from PropName
fn get_prop_name(key: &PropName) -> Option<String> {
    match key {
        PropName::Ident(i) => Some(i.sym.to_string()),
        PropName::Str(s) => Some(s.value.to_string()),
        _ => None,
    }
}

// Transform @Provides decorator to include method name
fn transform_provides_decorator(decorator: &mut Decorator, method_name: &str) {
    let span = decorator.span;
    decorator.expr = Expr::Call(CallExpr {
        span,
        callee: Callee::Expr(Box::new(Expr::Ident(Ident::new("Provides".into(), span)))),
        args: vec![ExprOrSpread {
            spread: None,
            expr: Box::new(create_name_object(method_name, span)),
        }],
        type_args: None,
    });
}

// Transform @Inject decorator to include property name
fn transform_inject_decorator(decorator: &mut Decorator, prop_name: &str) {
    let span = decorator.span;
    decorator.expr = Expr::Call(CallExpr {
        span,
        callee: Callee::Expr(Box::new(Expr::Ident(Ident::new("Inject".into(), span)))),
        args: vec![ExprOrSpread {
            spread: None,
            expr: Box::new(Expr::Lit(Lit::Str(Str {
                span,
                value: prop_name.into(),
                raw: None,
            }))),
        }],
        type_args: None,
    });
}

// Create an object expression with a name property
fn create_name_object(name: &str, span: Span) -> Expr {
    Expr::Object(ObjectLit {
        span,
        props: vec![PropOrSpread::Prop(Box::new(Prop::KeyValue(KeyValueProp {
            key: PropName::Ident(Ident::new("name".into(), span)),
            value: Box::new(Expr::Lit(Lit::Str(Str {
                span,
                value: name.into(),
                raw: None,
            }))),
        })))],
    })
}

// Transform method parameters to use object destructuring
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
                    key: ident.id.clone(),
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

// Plugin entry point
#[plugin_transform]
pub fn process_transform(program: Program, _metadata: TransformPluginProgramMetadata) -> Program {
    program.fold_with(&mut as_folder(DiTransformer))
}
