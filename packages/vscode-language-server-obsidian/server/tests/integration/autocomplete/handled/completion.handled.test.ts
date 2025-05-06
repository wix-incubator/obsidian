import { CompletionTestCase } from "../..";
import graphWithoutSubgraphs from "./graphWithoutSubgraphs";
import { CompletionCommand } from "../../../../src/commands/completion/completionCommand";
import { mock } from "jest-mock-extended";
import { ProjectAdapter } from "../../../../src/services/project/projectAdapter";
import { ProjectRegistry } from "../../../../src/services/project/projectRegistry";
import { TsConfigParser } from "../../../../src/services/tsConfig/tsconfigParser";
import * as path from 'path';
import graphWithSubgraph from "./graphWithSubgraph";
import graphWithSubgraphAndShadowdeDependency from "./graphWithSubgraphAndShadowdeDependency";
import graphThatProvidesImportedClass from "./graphThatProvidesImportedClass";
import graphThatProvidesHook from "./graphThatProvidesHook";
import graphWithSubgraphThatProvidesModel from "./graphWithSubgraphThatProvidesModel";
import providerWithMultipleDependencies from "./providerWithMultipleDependencies";

const testCases: CompletionTestCase[] = [
  graphWithoutSubgraphs,
  graphWithSubgraph,
  graphWithSubgraphAndShadowdeDependency,
  graphThatProvidesImportedClass,
  graphThatProvidesHook,
  graphWithSubgraphThatProvidesModel,
  providerWithMultipleDependencies
];

describe('Handled Completion', () => {
  let uut: CompletionCommand;

  beforeEach(() => {
    const projectRegistry = new ProjectRegistry(
      mock(),
      new TsConfigParser(),
      { overrideTsConfigPath: path.resolve(__dirname, '../../tsconfig.tests.json') }
    );
    const projectAdapter = new ProjectAdapter(projectRegistry, mock());
    uut = new CompletionCommand(projectAdapter, mock());
  });

  it.each(testCases.map(testCase => [testCase.name, testCase]))('should autocomplete for %s', async (_name: string, testCase: CompletionTestCase) => {
    const result = await uut.getCompletions(createParams(testCase));
    expect(result).toEqual(testCase.result);
  });

  function createParams(testCase: CompletionTestCase) {
    return {
      textDocument: { uri: testCase.entryPoint },
      position: testCase.position
    };
  }
});
