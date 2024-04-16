import { RuleTester } from '@typescript-eslint/rule-tester';
import { validGraphSimple } from './testUtils/validGraphs';
import { invalidGraph } from './invalidGraphs';
import { unresolvedDependencies } from './ruleConfiguration';

const ruleTester = new RuleTester();

ruleTester.run('@obsidian/provider-unresolved-dependencies', unresolvedDependencies, {
  valid: [validGraphSimple],
  invalid: [{
    code: invalidGraph,
    errors: [{
      messageId: '@obsidian/provider-unresolved-dependencies',
    }],
  }],
});
