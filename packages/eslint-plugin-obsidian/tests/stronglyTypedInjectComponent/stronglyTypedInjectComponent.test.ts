import { RuleTester } from '@typescript-eslint/rule-tester';
import { stronglyTypedInjectComponentGenerator } from '../../src/rules/stronglyTypedInjectComponent';
import { validGraph, validGraphWithoutProps } from './code/validGraphs';
import { invalidGraph } from './code/invalidGraphs';

const ruleTester = new RuleTester();

ruleTester.run(
  'strongly-typed-inject-component',
  stronglyTypedInjectComponentGenerator(),
  {
    valid: [
      validGraph,
      validGraphWithoutProps,
    ],
    valid1: [],
    invalid: [
      {
        code: invalidGraph,
        errors: [{ messageId: 'strongly-typed-inject-component' }],
      },
    ],
  },
);