import { RuleTester } from '@typescript-eslint/rule-tester';
import { validGraphSimple, validGraphWithSubgraph } from './testUtils/validGraphs';
import { unresolvedProviderDependenciesGenerator } from '../../rules/unresolvedProviderDependencies';
import { PathResolverStub } from '../stubs/PathResolverStub';
import { invalidGraph } from '../../rules/unresolvedProviderDependencies/invalidGraphs';

const ruleTester = new RuleTester();

ruleTester.run(
  'unresolved-provider-dependencies',
  unresolvedProviderDependenciesGenerator(new PathResolverStub()),
  {
    // valid: [validGraphWithSubgraphAndSubgraph],
    // invalid: [],
    valid: [validGraphSimple, validGraphWithSubgraph],
    invalid: [
      {
        code: invalidGraph,
        errors: [{
          messageId: 'unresolved-provider-dependencies',
        }],
      },
    ],
  },
);
