import { RuleTester } from '@typescript-eslint/rule-tester';
import { validGraphSimple } from './testUtils/validGraphs';
import { invalidGraph } from './invalidGraphs';
import { undefinedDependencies } from './ruleConfiguration';

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
  valid: [validGraphSimple],
  invalid: [{
    code: invalidGraph,
    errors: [{
      messageId: 'undefinedDependency',
    }],
  },
  // ,
  // {
  //   code: invalidGraphWithSubgraph,
  //   errors: [{
  //     messageId: 'undefinedDependency',
  //   }],
  // }
  ],
});
