import { DefinitionCommand } from "../../../../src/commands/definition/definitionCommand";
import { StrategyFactory } from "../../../../src/commands/definition/strategies/goToDefinitionStrategyFactory";
import { DefinitionTestCase } from "../..";
import injectedHook from "./injectedHook";
import dependencyInSameGraph from "./dependencyInSameGraph";
import dependencyInSubgraph from "./dependencyInSubgraph";
import injectedClass from "./injectedClass";
import injectedHookDifferentInjectedTypeName from "./injectedHookDifferentInjectedTypeName";
import injectedExportDefaultClass from "./injectedExportDefaultClass";
import injectedHookDependenciesOfTypeAlias from "./injectedHookDependenciesOfTypeAlias";
import injectedHookTypedProvider from "./injectedHookTypedProvider";
import injectedClassDependenciesOfTypeAlias from "./injectedClassDependenciesOfTypeAlias";
import injectedExportDefaultGraph from "./injectedExportDefaultGraph";
import dependencyInExportDefaultSubgraph from "./dependencyInExportDefaultSubgraph";
import { createParams } from "../../utils/createParams";
import { createTestProjectAdapter } from "../../utils/createTestProjectAdapter";
import { FakeLogger } from "../../fakes/fakeLogger";
import dependencyInNestedSubgraph from "./dependencyInNestedSubgraph";

const testCases: DefinitionTestCase[] = [
  injectedHook,
  dependencyInSameGraph,
  dependencyInSubgraph,
  injectedClass,
  injectedHookDifferentInjectedTypeName,
  injectedExportDefaultClass,
  injectedHookDependenciesOfTypeAlias,
  injectedClassDependenciesOfTypeAlias,
  injectedHookTypedProvider,
  injectedExportDefaultGraph,
  dependencyInExportDefaultSubgraph,
  dependencyInNestedSubgraph
];

describe('GoToDefinition', () => {
  let uut: DefinitionCommand;

  beforeEach(() => {
    const projectAdapter = createTestProjectAdapter();
    const logger = new FakeLogger();
    uut = new DefinitionCommand(projectAdapter, logger, new StrategyFactory(projectAdapter, logger));
  });

  it.each(testCases.map(testCase => [testCase.name, testCase]))('should go to definition for %s', async (_name: string, testCase: DefinitionTestCase) => {
    const result = await uut.onDefinition(createParams(testCase));
    expect(result).toEqual(testCase.result);
  });
});
