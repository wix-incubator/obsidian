import { RuleTester } from '@typescript-eslint/rule-tester';
import {
  circularDependencyBetween3Providers,
  circularDependencyBetweenSomeOfTheProviders,
  invalidGraph,
} from 'eslint-plugin-obsidian/tests/noCircularDependencies/code/invalidGraphs';
import { validGraph } from 'eslint-plugin-obsidian/tests/noCircularDependencies/code/validGraphs';
import { noCircularDependenciesGenerator } from '../../src/rules/noCircularDependency';

const ruleTester = new RuleTester();

ruleTester.run(
  'no-circular-dependencies',
  noCircularDependenciesGenerator(),
  {
    valid: [validGraph],
    invalid: [
      {
        code: invalidGraph,
        errors: [{ messageId: 'no-circular-dependencies' }],
      },
      {
        code: circularDependencyBetween3Providers,
        errors: [{ messageId: 'no-circular-dependencies' }],
      },
      {
        code: circularDependencyBetweenSomeOfTheProviders,
        errors: [{ messageId: 'no-circular-dependencies' }],
      },
    ],
  },
);
