import { RuleTester } from '@typescript-eslint/rule-tester';
import { unresolvedProviderDependenciesGenerator } from '../../rules/unresolvedProviderDependencies';
import { PathResolverStub } from '../stubs/PathResolverStub';
import {
  validFileWithTwoGraphs,
  validGraphSimple,
  validGraphWithSubgraph,
  validLifecycleBoundGraphWithSubgraph,
} from './fixtures/validGraphs';
import { invalidGraph } from './fixtures/invalidGraphs';

const ruleTester = new RuleTester();

ruleTester.run(
  'unresolved-provider-dependencies',
  unresolvedProviderDependenciesGenerator(new PathResolverStub()),
  {
    valid: [
      validGraphSimple,
      validGraphWithSubgraph,
      validLifecycleBoundGraphWithSubgraph,
      validFileWithTwoGraphs,
    ],
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
