import { RuleTester } from '@typescript-eslint/rule-tester';
import { stronglyTypedInjectComponentGenerator } from '../../src/rules/stronglyTypedInjectComponent';
import { validGraph, validGraphWithoutProps, validGraphWithOwnProps } from './code/validGraphs';
import {
invalidGraph,
invalidGraphOnlyWithOwnProps,
invalidGraphWithOwnPropsAndUnexpectedInjectedProps,
} from './code/invalidGraphs';

const ruleTester = new RuleTester();

ruleTester.run(
  'strongly-typed-inject-component',
  stronglyTypedInjectComponentGenerator(),
  {
    valid: [
      validGraph,
      validGraphWithoutProps,
      validGraphWithOwnProps,
    ],
    invalid: [
      {
        code: invalidGraph,
        errors: [{ messageId: 'strongly-typed-inject-component' }],
      },
      {
        code: invalidGraphOnlyWithOwnProps,
        errors: [{ messageId: 'strongly-typed-inject-component' }],
      },
      {
        code: invalidGraphWithOwnPropsAndUnexpectedInjectedProps,
        errors: [{ messageId: 'strongly-typed-inject-component' }],
      },
    ],
  },
);