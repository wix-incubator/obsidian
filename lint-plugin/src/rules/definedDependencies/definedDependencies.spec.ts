import { getFixturesRootDirectory } from "../../testing/fixtureSetup";
import { ESLintUtils } from "@typescript-eslint/utils";

const definedDependencies = require('./definedDependencies');
const tsRootDirectory = getFixturesRootDirectory();
const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2015,
    tsconfigRootDir: tsRootDirectory,
    project: "./tsconfig.json",
  },
});
const code =
`@Singleton() @Graph()
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