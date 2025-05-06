import { UnhandledCompletionTestCase } from "../..";
import { CompletionCommand } from "../../../../src/commands/completion/completionCommand";
import { mock } from "jest-mock-extended";
import { ProjectAdapter } from "../../../../src/services/project/projectAdapter";
import { ProjectRegistry } from "../../../../src/services/project/projectRegistry";
import { TsConfigParser } from "../../../../src/services/tsConfig/tsconfigParser";
import * as path from 'path';
import exportedFunction from "./exportedFunction";

const testCases: UnhandledCompletionTestCase[] = [
  exportedFunction
];

describe('Handled Completion', () => {
  let uut: CompletionCommand;

  beforeEach(() => {
    const projectRegistry = new ProjectRegistry(
      mock(),
      new TsConfigParser(),
      { overrideTsConfigPath: path.resolve(__dirname, '../../tsconfig.tests.json') }
    );
    const projectAdapter = new ProjectAdapter(projectRegistry);
    uut = new CompletionCommand(projectAdapter, mock());
  });

  it.each(testCases.map(testCase => [testCase.name, testCase]))('should not autocomplete for %s', async (_name: string, testCase: UnhandledCompletionTestCase) => {
    const result = await uut.getCompletions(createParams(testCase));
    expect(result).toEqual([]);
  });

  function createParams(testCase: UnhandledCompletionTestCase) {
    return {
      textDocument: { uri: testCase.entryPoint },
      position: testCase.position
    };
  }
});
