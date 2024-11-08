#[cfg(test)]
mod tests {
    use super::*;
    use swc_core::common::{chain, Mark};
    use swc_core::ecma::transforms::testing::test;
    use swc_core::ecma::visit::as_folder;

    test!(
        Default::default(),
        |_| as_folder(DiTransformer),
        provides_decorator,
        r#"
        class UserService {
            @Provides()
            getUser(id: string, role: string) {
                return { id, role };
            }
        }
        "#,
        r#"
        class UserService {
            @Provides({ name: "getUser" })
            getUser({ id, role }) {
                return { id, role };
            }
        }
        "#
    );

    test!(
        Default::default(),
        |_| as_folder(DiTransformer),
        inject_decorator,
        r#"
        class UserService {
            @Inject()
            private userRepo: UserRepository;
        }
        "#,
        r#"
        class UserService {
            @Inject("userRepo")
            private userRepo: UserRepository;
        }
        "#
    );
}