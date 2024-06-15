import { RuleTester } from '@typescript-eslint/rule-tester';
import { validGraphSimple } from './testUtils/validGraphs';
import { unresolvedProviderDependencies } from '../../rules/unresolvedProviderDependencies';
import { invalidGraph } from '../../rules/unresolvedProviderDependencies/invalidGraphs';

const ruleTester = new RuleTester();

ruleTester.run('unresolved-provider-dependencies', unresolvedProviderDependencies, {
  valid: [validGraphSimple],
  invalid: [
    {
      code: invalidGraph,
      errors: [{
        messageId: 'unresolved-provider-dependencies',
      }],
    },
  ],
});
