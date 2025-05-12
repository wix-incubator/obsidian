import { DefinitionCommand } from "../../../../src/commands/definition/definitionCommand";
import { StrategyFactory } from "../../../../src/commands/definition/strategies/goToDefinitionStrategyFactory";
import { UnhandledDefinitionTestCase } from "../..";
import { createParams } from "../../utils/createParams";
import { createTestProjectAdapter } from "../../utils/createTestProjectAdapter";
import { FakeLogger } from "../../fakes/fakeLogger";
import destructuredClassArgument from "./classPassedViaProps";
import classArgumentInFunction from "./classArgumentInFunction";

const testCases: UnhandledDefinitionTestCase[] = [
  destructuredClassArgument,
  classArgumentInFunction,
];

describe('GoToDefinition', () => {
  let uut: DefinitionCommand;

  beforeEach(() => {
    const projectAdapter = createTestProjectAdapter();
    const logger = new FakeLogger();
    uut = new DefinitionCommand(projectAdapter, logger, new StrategyFactory(projectAdapter, logger));
  });

  it.each(testCases.map(testCase => [testCase.name, testCase]))('should go to definition for %s', async (_name: string, testCase: UnhandledDefinitionTestCase) => {
    const result = await uut.onDefinition(createParams(testCase));
    expect(result).toBeUndefined();
  });
});
