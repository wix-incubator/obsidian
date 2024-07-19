import { RuleTester } from '@typescript-eslint/rule-tester';
import { stronglyTypedInjectComponentGenerator } from '../../src/rules/stronglyTypedInjectComponent';
import { validGraph } from './code/validGraphs';

const ruleTester = new RuleTester();

ruleTester.run(
  'strongly-typed-inject-component',
  stronglyTypedInjectComponentGenerator(),
  {
    valid: [
      validGraph,
    ],
    invalid: [
      // {
      //   code: invalidGraph,
      //   errors: [{ messageId: 'strongly-typed-inject-component' }],
      // },
    ],
  },
);