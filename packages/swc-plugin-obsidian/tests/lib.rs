use std::path::PathBuf;
use swc_core::{
    ecma::{
        parser::{Syntax, TsSyntax},
        transforms::testing::test_fixture,
        visit::visit_mut_pass,
    },
    testing,
};
use swc_plugin_obsidian::DiTransformer;

#[testing::fixture("tests/fixtures/**/input.ts")]
fn exec(input: PathBuf) {
    let output = input.with_file_name("output.js");
    test_fixture(
        Syntax::Typescript(TsSyntax {
            decorators: true,
            ..Default::default()
        }),
        &|_| visit_mut_pass(DiTransformer),
        &input,
        &output,
        Default::default(),
    );
}