import { RuleTester } from '@typescript-eslint/rule-tester';
import { readFileSync } from 'fs';
import { join } from 'path';
import { unresolvedProviderDependenciesGenerator } from '../../src/rules/unresolvedProviderDependencies';
import { PathResolverStub } from '../stubs/PathResolverStub';

const loadFixture = (filename: string) => {
  return readFileSync(join(__dirname, 'fixtures', filename), 'utf-8');
};

const ruleTester = new RuleTester();

ruleTester.run(
  'unresolved-provider-dependencies',
  unresolvedProviderDependenciesGenerator(new PathResolverStub()),
  {
    valid: [
      {
        code: loadFixture('validGraph.ts'),
        filename: 'validGraph.ts',
      },
      {
        code: loadFixture('validGraphWithSubgraph.ts'),
        filename: 'validGraphWithSubgraph.ts',
      },
      {
        code: loadFixture('validLifecycleBoundGraphWithSubgraph.ts'),
        filename: 'validLifecycleBoundGraphWithSubgraph.ts',
      },
      {
        code: loadFixture('validFileWithTwoGraphs.ts'),
        filename: 'validFileWithTwoGraphs.ts',
      },
      {
        code: loadFixture('validGraphWithNamedExportSubgraph.ts'),
        filename: 'validGraphWithNamedExportSubgraph.ts',
      },
      {
        code: loadFixture('validGraphWithRegularMethod.ts'),
        filename: 'validGraphWithRegularMethod.ts',
      },
      {
        code: loadFixture('validGraphWithNestedSubgraphs.ts'),
        filename: 'validGraphWithNestedSubgraphs.ts',
      },
      {
        code: loadFixture('validGraphThatExtendsAnotherGraph.ts'),
        filename: 'validGraphThatExtendsAnotherGraph.ts',
      },
      {
        code: loadFixture('validGraphWithSubgraphThatExtendsAnotherGraph.ts'),
        filename: 'validGraphWithSubgraphThatExtendsAnotherGraph.ts',
      },
      {
        code: loadFixture('validGraphThatExtendsAnotherConcreteGraph.ts'),
        filename: 'validGraphThatExtendsAnotherConcreteGraph.ts',
      },
      // {
      //   code: loadFixture('validGraphWithExternalSubgraph.ts'),
      //   filename: 'validGraphWithExternalSubgraph.ts',
      // },
    ],
    invalid: [
      {
        code: loadFixture('invalidGraph.ts'),
        filename: 'invalidGraph.ts',
        errors: [{
          messageId: 'unresolved-provider-dependencies',
        }],
      },
    ],
  },
);
