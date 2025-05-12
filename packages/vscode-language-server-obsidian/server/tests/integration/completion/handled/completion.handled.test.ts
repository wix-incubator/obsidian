import { CompletionTestCase } from "../..";
import graphWithoutSubgraphs from "./graphWithoutSubgraphs";
import { CompletionCommand } from "../../../../src/commands/completion/completionCommand";
import graphWithSubgraph from "./graphWithSubgraph";
import graphWithSubgraphAndShadowdeDependency from "./graphWithSubgraphAndShadowdeDependency";
import graphThatProvidesImportedClass from "./graphThatProvidesImportedClass";
import graphThatProvidesHook from "./graphThatProvidesHook";
import graphWithSubgraphThatProvidesModel from "./graphWithSubgraphThatProvidesModel";
import providerWithMultipleDependencies from "./providerWithMultipleDependencies";
import { createParams } from "../../utils/createParams";
import { createTestProjectAdapter } from "../../utils/createTestProjectAdapter";
import { FakeLogger } from "../../fakes/fakeLogger";

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
    uut = new CompletionCommand(createTestProjectAdapter(), new FakeLogger());
  });

  it.each(testCases.map(testCase => [testCase.name, testCase]))('should autocomplete for %s', async (_name: string, testCase: CompletionTestCase) => {
    const result = await uut.getCompletions(createParams(testCase));
    expect(result).toEqual(testCase.result);
  });
});
