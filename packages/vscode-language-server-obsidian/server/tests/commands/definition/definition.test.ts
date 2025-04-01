import { DefinitionCommand } from '../../../src/commands/definition/definition';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { TextDocuments } from 'vscode-languageserver/node';
import { mock } from 'jest-mock-extended';
import { Logger } from '../../../src/services/logger';
import * as ts from 'typescript';
import { when } from 'jest-when';
import { SourceFileCreator } from '../../../src/services/sourceFileCreator';
import { StrategyFactory } from '../../../src/commands/definition/strategies/goToDefinitionStrategyFactory';

describe('DefinitionCommand', () => {
  let uut: DefinitionCommand;
  let documents: jest.Mocked<TextDocuments<TextDocument>>;
  let logger: jest.Mocked<Logger>;
  let sourceFileCreator: jest.Mocked<SourceFileCreator>;
  let strategyFactory: jest.Mocked<StrategyFactory>;
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
}
  `;

  beforeEach(() => {
    documents = mock();
    logger = mock();
    sourceFileCreator = mock();
    strategyFactory = mock();
    uut = new DefinitionCommand(documents, logger, sourceFileCreator, strategyFactory);
  });

  it('should delegate to strategy factory', async () => {
    const params = createParams()
    const document = mock<TextDocument>();
    when(document.offsetAt).calledWith(params.position).mockReturnValue(TEST_SOURCE.indexOf('bar: string'));
    const sourceFile = ts.createSourceFile('test.ts', TEST_SOURCE, ts.ScriptTarget.Latest, true);
    when(sourceFileCreator.create).calledWith(document).mockReturnValue(sourceFile);
    when(documents.get).calledWith(params.textDocument.uri).mockReturnValue(document);

    await uut.onDefinition(params);

    expect(strategyFactory.create).toHaveBeenCalledWith(expect.anything(), document);
  });
});

function createParams() {
  return {
    textDocument: { uri: 'test.ts' },
    position: { line: 0, character: 0 }
  };
}
