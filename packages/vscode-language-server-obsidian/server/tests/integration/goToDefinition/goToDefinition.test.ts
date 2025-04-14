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
import injectedClassDependenciesOf from "./injectedClassDependenciesOf";
import * as path from 'path';

const testCases: TestCase[] = [
  injectedHook,
  dependencyInSameGraph,
  dependencyInSubgraph,
  injectedClass,
  injectedHookDifferentInjectedTypeName,
  injectedExportDefaultClass,

  // injectedClassDependenciesOf
];

describe('GoToDefinition', () => {
  let project: Project;
  let projectAdapter: ProjectAdapter;
  let uut: DefinitionCommand;

  beforeEach(() => {
    project = new Project({
      tsConfigFilePath: path.resolve(__dirname, '../../tsconfig.tests.json'),
    });
    projectAdapter = new ProjectAdapter(project);
    uut = new DefinitionCommand(projectAdapter, mock(), new StrategyFactory(projectAdapter));
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
