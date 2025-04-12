import { TextDocuments } from "vscode-languageserver/node";
import { DefinitionCommand } from "../../../src/commands/definition/definitionCommand";
import { StrategyFactory } from "../../../src/commands/definition/strategies/goToDefinitionStrategyFactory";
import { ProjectAdapter } from "../../../src/services/ast/projectAdapter";
import { Logger } from "../../../src/services/logger";
import { TextDocument } from "vscode-languageserver-textdocument";
import { mockDeep, mock } from "jest-mock-extended";
import { when } from "jest-when";
import { createDocument } from "../../__utils__/document";
import { TestCase } from "..";
import injectedHook from "./injectedHook";
import { Project } from "ts-morph";
import dependencyInSameGraph from "./dependencyInSameGraph";
import dependencyInSubgraph from "./dependencyInSubgraph";
import injectedClass from "./injectedClass";

const testCases: TestCase[] = [
  injectedHook,
  dependencyInSameGraph,
  dependencyInSubgraph,
  injectedClass
];

describe('GoToDefinition', () => {
  let project: Project;
  let projectAdapter: ProjectAdapter;
  let documents: TextDocuments<TextDocument>;
  let uut: DefinitionCommand;

  beforeEach(() => {
    documents = mockDeep<TextDocuments<TextDocument>>();
    project = new Project({ useInMemoryFileSystem: true });
    projectAdapter = new ProjectAdapter(documents, project);
    uut = new DefinitionCommand(projectAdapter, mock(), new StrategyFactory(projectAdapter));
  });

  it.each(testCases)('should go to definition', async (testCase: TestCase) => {
    mockSourceFiles(testCase);
    const params = createParams(testCase);

    const result = await uut.onDefinition(params);

    expect(result).toEqual(testCase.result);
  });

  function createParams(testCase: TestCase) {
    return {
      textDocument: { uri: testCase.entryPoint.path },
      position: testCase.position
    };
  }

  function mockSourceFiles(testCase: TestCase) {
    [testCase.entryPoint, ...testCase.additionalSourceCodes ?? []].forEach(sourceCode => {
      project.createSourceFile(sourceCode.path, sourceCode.content);
      when(documents.get)
        .calledWith(sourceCode.path)
        .mockReturnValue(createDocument(sourceCode.content, sourceCode.path));
    });
  }
});
