use swc_core::ecma::{
    ast::*,
    visit::{visit_mut_pass, VisitMut, VisitMutWith},
};
use swc_core::{
    plugin::{plugin_transform, proxies::TransformPluginProgramMetadata},
    common::Span
};

pub struct DiTransformer;

impl VisitMut for DiTransformer {
  fn visit_mut_class_member(&mut self, member: &mut ClassMember) {
      member.visit_mut_children_with(self);

      match member {
          ClassMember::Method(method) => {
              if let Some(provides_idx) = find_decorator(&method.function.decorators, "Provides") {
                  if let Some(method_name) = get_method_name(&method.key) {
                      transform_provides_decorator(&mut method.function.decorators[provides_idx], &method_name);
                      transform_method_params(&mut method.function);
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
  let span = decorator.span;
  decorator.expr = Box::new(Expr::Call(CallExpr {
      span,
      callee: Callee::Expr(Box::new(Expr::Ident(Ident::new(
          method_name.into(),
          span,
          Default::default(),
      )))),
      args: vec![ExprOrSpread {
          spread: None,
          expr: Box::new(create_name_object(method_name, span)),
      }],
      type_args: None,
      ctxt: Default::default(),
  }));
}

fn transform_inject_decorator(decorator: &mut Decorator, prop_name: &str) {
  let span = decorator.span;
  decorator.expr = Box::new(Expr::Call(CallExpr {
      span,
      callee: Callee::Expr(Box::new(Expr::Ident(Ident::new(
          "Inject".into(),
          span,
          Default::default(),
      )))),
      args: vec![ExprOrSpread {
          spread: None,
          expr: Box::new(Expr::Lit(Lit::Str(Str::from(prop_name)))),
      }],
      type_args: None,
      ctxt: Default::default(),
  }));
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

#[plugin_transform]
pub fn process_transform(program: Program, _config: TransformPluginProgramMetadata) -> Program {
//   program.fold_with(&mut visit_mut_pass(DiTransformer))
  return program.apply(visit_mut_pass(DiTransformer));
}
