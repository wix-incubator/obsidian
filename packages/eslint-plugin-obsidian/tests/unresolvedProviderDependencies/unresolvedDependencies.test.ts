import { RuleTester } from '@typescript-eslint/rule-tester';
import { unresolvedProviderDependenciesGenerator } from '../../src/rules/unresolvedProviderDependencies';
import { PathResolverStub } from '../stubs/PathResolverStub';
import {
  validFileWithTwoGraphs,
  validGraph,
  validGraphWithNamedExportSubgraph,
  validGraphWithNestedSubgraphs,
  validGraphWithRegularMethod,
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
      validGraph,
      validGraphWithSubgraph,
      validLifecycleBoundGraphWithSubgraph,
      validFileWithTwoGraphs,
      validGraphWithNamedExportSubgraph,
      validGraphWithRegularMethod,
      validGraphWithNestedSubgraphs,
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
