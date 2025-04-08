import { DefinitionCommand } from '../../../src/commands/definition/definitionCommand';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { TextDocuments } from 'vscode-languageserver/node';
import { mock } from 'jest-mock-extended';
import { Logger } from '../../../src/services/logger';
import * as ts from 'typescript';
import { when } from 'jest-when';
import { SourceFileCreator } from '../../../src/services/sourceFileCreator';
import { StrategyFactory } from '../../../src/commands/definition/strategies/goToDefinitionStrategyFactory';
import { ProjectAdapter } from '../../../src/services/ast/project';

describe('DefinitionCommand', () => {
  let uut: DefinitionCommand;
  let logger: jest.Mocked<Logger>;
  let sourceFileCreator: jest.Mocked<SourceFileCreator>;
  let strategyFactory: jest.Mocked<StrategyFactory>;
  let projectAdapter: jest.Mocked<ProjectAdapter>;
  let documents: jest.Mocked<TextDocuments<TextDocument>>;
  const TEST_SOURCE = `
@graph()
class TestGraph {
  @provides()
  foo(bar: string): string {
    return "foo";
  }

  @provides()
  bar(): string {
    return "bar";
  }
}`;

  beforeEach(() => {
    logger = mock();
    sourceFileCreator = mock();
    strategyFactory = mock();
    projectAdapter = mock();
    documents = mock();
    uut = new DefinitionCommand(projectAdapter, documents, logger, strategyFactory);
  });

  xit('should delegate to strategy factory', async () => {
    const params = createParams()
    // const document = mock<TextDocument>();
    // when(document.offsetAt).calledWith(params.position).mockReturnValue(TEST_SOURCE.indexOf('bar: string'));
    // const sourceFile = ts.createSourceFile('test.ts', TEST_SOURCE, ts.ScriptTarget.Latest, true);
    // when(sourceFileCreator.create).calledWith(document).mockReturnValue(sourceFile);
    // when(documents.get).calledWith(params.textDocument.uri).mockReturnValue(document);

    await uut.onDefinition(params);

    expect(strategyFactory.create).toHaveBeenCalledWith(expect.anything());
  });
});

function createParams() {
  return {
    textDocument: { uri: 'test.ts' },
    position: { line: 0, character: 0 }
  };
}
