import { DefinitionCommand } from "../../../src/commands/definition/definitionCommand";
import { StrategyFactory } from "../../../src/commands/definition/strategies/goToDefinitionStrategyFactory";
import { ProjectAdapter } from "../../../src/services/project/projectAdapter";
import { mock } from "jest-mock-extended";
import { TestCase } from "..";
import injectedHook from "./injectedHook";
import { Project } from "ts-morph";
import dependencyInSameGraph from "./dependencyInSameGraph";
import dependencyInSubgraph from "./dependencyInSubgraph";
import injectedClass from "./injectedClass";
import injectedHookDifferentInjectedTypeName from "./injectedHookDifferentInjectedTypeName";
import injectedExportDefaultClass from "./injectedExportDefaultClass";
import injectedHookDependenciesOfTypeAlias from "./injectedHookDependenciesOfTypeAlias";
import * as path from 'path';
import { ProjectRegistry } from "../../../src/services/project/projectRegistry";
import injectedHookTypedProvider from "./injectedHookTypedProvider";
import injectedClassDependenciesOfTypeAlias from "./injectedClassDependenciesOfTypeAlias";
import { TsconfigParser } from "../../../src/services/tsConfig/tsconfigParser";

const testCases: TestCase[] = [
  injectedHook,
  dependencyInSameGraph,
  dependencyInSubgraph,
  injectedClass,
  injectedHookDifferentInjectedTypeName,
  injectedExportDefaultClass,
  injectedHookDependenciesOfTypeAlias,
  injectedClassDependenciesOfTypeAlias,
  injectedHookTypedProvider
];

describe('GoToDefinition', () => {
  let projectAdapter: ProjectAdapter;
  let uut: DefinitionCommand;

  beforeEach(() => {
    const projectRegistry = new ProjectRegistry(
      mock(),
      new TsconfigParser(),
      { overrideTsConfigPath: path.resolve(__dirname, '../../tsconfig.tests.json') }
    );
    projectAdapter = new ProjectAdapter(projectRegistry, mock());
    uut = new DefinitionCommand(projectAdapter, mock(), new StrategyFactory(projectAdapter, mock()));
  });

  it.each(testCases)('should go to definition', async (testCase: TestCase) => {
    const result = await uut.onDefinition(createParams(testCase));
    expect(result).toEqual(testCase.result);
  });

  function createParams(testCase: TestCase) {
    return {
      textDocument: { uri: testCase.entryPoint },
      position: testCase.position
    };
  }
});
