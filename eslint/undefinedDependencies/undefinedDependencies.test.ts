import { RuleTester } from '@typescript-eslint/rule-tester';
import { undefinedDependencies } from './ruleConfiguration';
import { validGraph } from './testUtils/validGraphs';
import { invalidGraph } from './testUtils/invalidGraphs';

// describe('createFunction', () => {
//   let uut: (context: any) => any;

//   beforeEach(() => {
//     uut = create;
//   });

//   it('defines a create function', () => {
//     expect(uut).toBeDefined();
//   });
// });

const ruleTester = new RuleTester();
ruleTester.run('undefined-dependency', undefinedDependencies, {
  valid: [validGraph],
  invalid: [{
    code: invalidGraph,
    errors: [{
      messageId: 'undefinedDependency',
    }],
  }],
});
