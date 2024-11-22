import { RuleTester } from '@typescript-eslint/rule-tester';
import { unresolvedProviderDependenciesGenerator } from '../../src/rules/unresolvedProviderDependencies';
import { PathResolverStub } from '../stubs/PathResolverStub';
import {
  validFileWithTwoGraphs,
  validGraph,
  validGraphThatExtendsAnotherGraph,
  validGraphWithNamedExportSubgraph,
  validGraphWithNestedSubgraphs,
  validGraphWithRegularMethod,
  validGraphWithSubgraph,
  validGraphWithSubgraphThatExtendsAnotherGraph,
  validLifecycleBoundGraphWithSubgraph,
  validGraphThatExtendsAnotherConcreteGraph,
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
      validGraphThatExtendsAnotherGraph,
      validGraphWithSubgraphThatExtendsAnotherGraph,
      validGraphThatExtendsAnotherConcreteGraph,
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
