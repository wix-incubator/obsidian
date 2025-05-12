import { UnhandledCompletionTestCase } from "../..";
import { CompletionCommand } from "../../../../src/commands/completion/completionCommand";
import { createParams } from "../../utils/createParams";
import { createTestProjectAdapter } from "../../utils/createTestProjectAdapter";
import { FakeLogger } from "../../fakes/fakeLogger";
import exportedFunction from "./exportedFunction";

const testCases: UnhandledCompletionTestCase[] = [
  exportedFunction
];

describe('Handled Completion', () => {
  let uut: CompletionCommand;

  beforeEach(() => {
    uut = new CompletionCommand(createTestProjectAdapter(), new FakeLogger());
  });

  it.each(testCases.map(testCase => [testCase.name, testCase]))('should not autocomplete for %s', async (_name: string, testCase: UnhandledCompletionTestCase) => {
    const result = await uut.getCompletions(createParams(testCase));
    expect(result).toEqual([]);
  });
});
