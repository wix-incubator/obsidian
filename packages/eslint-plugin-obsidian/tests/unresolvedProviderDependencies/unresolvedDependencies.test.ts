import { RuleTester } from '@typescript-eslint/rule-tester';
import {
  validGraphSimple,
  validGraphWithSubgraph,
  validLifecycleBoundGraphWithSubgraph,
} from './fixtures/validGraphs';
import { unresolvedProviderDependenciesGenerator } from '../../rules/unresolvedProviderDependencies';
import { invalidGraph } from './fixtures/invalidGraphs';
import { PathResolverStub } from '../stubs/PathResolverStub';

const ruleTester = new RuleTester();

ruleTester.run(
  'unresolved-provider-dependencies',
  unresolvedProviderDependenciesGenerator(new PathResolverStub()),
  {
    valid: [validGraphSimple, validGraphWithSubgraph, validLifecycleBoundGraphWithSubgraph],
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
