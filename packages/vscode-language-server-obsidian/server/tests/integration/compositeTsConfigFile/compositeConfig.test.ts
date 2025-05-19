import { CompletionTestCase } from "..";
import graphWithoutSubgraphs from "../completion/handled/graphWithoutSubgraphs";
import { CompletionCommand } from "../../../src/commands/completion/completionCommand";
import { createParams } from "../utils/createParams";
import { FakeLogger } from "../fakes/fakeLogger";
import { createTestProjectAdapter } from "../utils/createTestProjectAdapter";

const testCases: CompletionTestCase[] = [
  graphWithoutSubgraphs,
];

describe('Handled Completion', () => {
  let uut: CompletionCommand;

  beforeEach(() => {
    uut = new CompletionCommand(createTestProjectAdapter(), new FakeLogger());
  });

  it.each(testCases.map(testCase => [testCase.name, testCase]))('should autocomplete for %s', async (_name: string, testCase: CompletionTestCase) => {
    const result = await uut.getCompletions(createParams(testCase));
    expect(result).toEqual(testCase.result);
  });
});

