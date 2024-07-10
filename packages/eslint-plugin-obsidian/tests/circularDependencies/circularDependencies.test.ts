import { RuleTester } from '@typescript-eslint/rule-tester';
import { circularDependenciesGenerator } from '../../src/rules/circularDependency';
import {
circularDependencyBetween3Providers,
circularDependencyBetweenSomeOfTheProviders,
invalidGraph,
} from './code/invalidGraphs';
import { validGraph } from './code/validGraphs';

const ruleTester = new RuleTester();

ruleTester.run(
  'circular-dependencies',
  circularDependenciesGenerator(),
  {
    valid: [validGraph],
    invalid: [
      {
        code: invalidGraph,
        errors: [{ messageId: 'circular-dependencies' }],
      },
      {
        code: circularDependencyBetween3Providers,
        errors: [{ messageId: 'circular-dependencies' }],
      },
      {
        code: circularDependencyBetweenSomeOfTheProviders,
        errors: [{ messageId: 'circular-dependencies' }],
      },
    ],
  },
);