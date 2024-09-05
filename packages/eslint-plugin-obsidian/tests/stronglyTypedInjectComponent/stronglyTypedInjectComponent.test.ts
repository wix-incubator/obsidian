import { RuleTester } from '@typescript-eslint/rule-tester';
import { stronglyTypedInjectComponentGenerator } from '../../src/rules/stronglyTypedInjectComponent';
import {
  validGraph,
  validGraphWithPropsInWrongOrder,
  validGraphWithInjectedProps,
  validGraphWithInlineTypes,
  validGraphWithoutProps,
  validGraphWithOwnProps,
  validGraphWithUntypedProps,
  validGraphThatDoesNotUseOwnProps,
} from './code/validGraphs';
import {
  invalidGraph,
  invalidGraphOnlyWithOwnProps,
  invalidGraphWithInjectedProps,
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
      validGraphWithInjectedProps,
      validGraphWithUntypedProps,
      validGraphWithInlineTypes,
      validGraphWithPropsInWrongOrder,
      validGraphThatDoesNotUseOwnProps,
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
      {
        code: invalidGraphWithInjectedProps,
        errors: [{ messageId: 'strongly-typed-inject-component' }],
      },
    ],
  },
);
