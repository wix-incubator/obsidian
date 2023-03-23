import { ESLintUtils } from "@typescript-eslint/utils";

const definedDependencies = require('./definedDependencies');
const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2015,
    project: "./tsconfig.json",
  },
});
const code =
`
@Singleton() @Graph()
export default class ApplicationGraph extends ObjectGraph {

  @Provides()
  engineService(): EngineService {
    return engineService;
  };
  @Provides()
  engine(engineService: EngineService): EngineInstance {
    return engineService.instance;
  };
};
`

ruleTester.run('definedDependencies', definedDependencies, {
  valid: [{
    code: `class ExampleProviderIncludedInModule { };`,
  }]
  ,
  invalid: [{
    code: code,
    // we can use messageId from the rule object
    errors: [{ messageId: "dependencyUndefined" }],
  }]
});