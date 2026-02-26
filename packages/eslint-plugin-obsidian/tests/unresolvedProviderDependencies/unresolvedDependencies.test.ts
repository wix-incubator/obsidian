import { RuleTester } from '@typescript-eslint/rule-tester';
import { readFileSync } from 'fs';
import { join } from 'path';
import { unresolvedProviderDependenciesGenerator } from '../../src/rules/unresolvedProviderDependencies';

const loadFixture = (filename: string) => {
  return readFileSync(join(__dirname, 'fixtures', filename), 'utf-8');
};

const ruleTester = new RuleTester();
const skipValid = false;
const skipInvalid = false;

ruleTester.run(
  'unresolved-provider-dependencies',
  unresolvedProviderDependenciesGenerator(),
  {
    valid: [
      {
        code: loadFixture('validGraph.ts'),
        filename: 'validGraph.ts',
        skip: skipValid,
      },
      {
        code: loadFixture('validGraphWithSubgraph.ts'),
        filename: 'validGraphWithSubgraph.ts',
        skip: skipValid,
      },
      {
        code: loadFixture('validLifecycleBoundGraphWithSubgraph.ts'),
        filename: 'validLifecycleBoundGraphWithSubgraph.ts',
        skip: skipValid,
      },
      {
        code: loadFixture('validFileWithTwoGraphs.ts'),
        filename: 'validFileWithTwoGraphs.ts',
        skip: skipValid,
      },
      {
        code: loadFixture('validGraphWithNamedExportSubgraph.ts'),
        filename: 'validGraphWithNamedExportSubgraph.ts',
        skip: skipValid,
      },
      {
        code: loadFixture('validGraphWithRegularMethod.ts'),
        filename: 'validGraphWithRegularMethod.ts',
        skip: skipValid,
      },
      {
        code: loadFixture('validGraphWithNestedSubgraphs.ts'),
        filename: 'validGraphWithNestedSubgraphs.ts',
        skip: skipValid,
      },
      {
        code: loadFixture('validGraphThatExtendsAnotherGraph.ts'),
        filename: 'validGraphThatExtendsAnotherGraph.ts',
        skip: skipValid,
      },
      {
        code: loadFixture('validGraphWithSubgraphThatExtendsAnotherGraph.ts'),
        filename: 'validGraphWithSubgraphThatExtendsAnotherGraph.ts',
        skip: skipValid,
      },
      {
        code: loadFixture('validGraphThatExtendsAnotherConcreteGraph.ts'),
        filename: 'validGraphThatExtendsAnotherConcreteGraph.ts',
        skip: skipValid,
      },
      {
        code: loadFixture('validGraphWithExternalSubgraph.ts'),
        filename: 'validGraphWithExternalSubgraph.ts',
        skip: skipValid,
      },
      {
        code: loadFixture('validGraphWithUnderscorePrefixedParam.ts'),
        filename: 'validGraphWithUnderscorePrefixedParam.ts',
        skip: skipValid,
      },
    ],
    invalid: [
      {
        code: loadFixture('invalidGraph.ts'),
        filename: 'invalidGraph.ts',
        skip: skipInvalid,
        errors: [{
          messageId: 'unresolved-provider-dependencies',
        }],
      },
    ],
  },
);
