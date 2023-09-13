import { RuleTester } from '@typescript-eslint/rule-tester';
import { undefinedDependencies } from './ruleConfiguration';
import { validGraph } from './testUtils/validGraphs';
import { invalidGraph } from './testUtils/invalidGraphs';
import { create } from './createFunction';

describe('createFunction', () => {
  let uut: (context: any) => any;

  beforeEach(() => {
    uut = create;
  });

  it('defines a create function', () => {
    expect(uut).toBeDefined();
  });
});

const ruleTester = new RuleTester();
// simple graph test
ruleTester.run('undefined-dependency', undefinedDependencies, {
  valid: [validGraph],
  invalid: [{
    code: invalidGraph,
    errors: [{
      messageId: 'undefinedDependency',
    }],
  }],
});

// graph with subgraph test
