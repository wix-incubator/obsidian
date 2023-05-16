import { ESLintUtils } from "@typescript-eslint/utils";

import definedDependencies from './definedDependencies';

  const ruleTester = new ESLintUtils.RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {ecmaVersion: 2015},
  });
  const code =
    `
    import {
  Graph,
  ObjectGraph,
  Provides,
  Singleton,
} from '../../src';

@Graph()
export class UniqueNumberGraph extends ObjectGraph {
  constructor(private uniqueNumberGenerator: () => number) {
    super();
  }

  @Provides() @Singleton()
  singletonNumber(): number {
    return this.uniqueNumberGenerator();
  }

  @Provides()
  instanceNumber(): number {
    return this.uniqueNumberGenerator();
  }
}

    `

  ruleTester.run('definedDependencies', definedDependencies, {
    valid: [{
      code:code,
    }]
    ,
    invalid: [{
      code: `class ExampleProviderIncludedInModule { };`,
      // we can use messageId from the rule object
      errors: [{ messageId: "dependencyUndefined" }],
    }]
  })

