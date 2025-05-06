import { DefinitionCommand } from "../../../../src/commands/definition/definitionCommand";
import { StrategyFactory } from "../../../../src/commands/definition/strategies/goToDefinitionStrategyFactory";
import { ProjectAdapter } from "../../../../src/services/project/projectAdapter";
import { mock } from "jest-mock-extended";
import destructuredClassArgument from "./classPassedViaProps";
import * as path from 'path';
import { ProjectRegistry } from "../../../../src/services/project/projectRegistry";
import { TsConfigParser } from "../../../../src/services/tsConfig/tsconfigParser";
import classArgumentInFunction from "./classArgumentInFunction";
import { UnhandledDefinitionTestCase } from "../..";

const testCases: UnhandledDefinitionTestCase[] = [
  destructuredClassArgument,
  classArgumentInFunction,
];

describe('GoToDefinition', () => {
  let projectAdapter: ProjectAdapter;
  let uut: DefinitionCommand;

  beforeEach(() => {
    const projectRegistry = new ProjectRegistry(
      mock(),
      new TsConfigParser(),
      { overrideTsConfigPath: path.resolve(__dirname, '../../tsconfig.tests.json') }
    );
    projectAdapter = new ProjectAdapter(projectRegistry, mock());
    uut = new DefinitionCommand(projectAdapter, mock(), new StrategyFactory(projectAdapter, mock()));
  });

  it.each(testCases.map(testCase => [testCase.name, testCase]))('should go to definition for %s', async (_name: string, testCase: UnhandledDefinitionTestCase) => {
    const result = await uut.onDefinition(createParams(testCase));
    expect(result).toBeUndefined();
  });

  function createParams(testCase: UnhandledDefinitionTestCase) {
    return {
      textDocument: { uri: testCase.entryPoint },
      position: testCase.position
    };
  }
});
