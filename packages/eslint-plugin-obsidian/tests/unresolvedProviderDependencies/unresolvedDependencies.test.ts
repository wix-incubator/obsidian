import { RuleTester } from '@typescript-eslint/rule-tester';
import { validGraphSimple, validGraphWithSubgraph } from './testUtils/validGraphs';
import { unresolvedProviderDependenciesGenerator } from '../../rules/unresolvedProviderDependencies';
import { invalidGraph } from '../../rules/unresolvedProviderDependencies/invalidGraphs';
import { PathResolverStub } from '../stubs/PathResolverStub';

const ruleTester = new RuleTester();

ruleTester.run(
  'unresolved-provider-dependencies',
  unresolvedProviderDependenciesGenerator(new PathResolverStub()),
  {
    valid: [validGraphSimple, validGraphWithSubgraph],
    invalid: [
      {
        code: invalidGraph,
        errors: [{
          messageId: 'unresolved-provider-dependencies',
        }],
      },
    ],
  }
);
