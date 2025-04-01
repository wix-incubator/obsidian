import { DefinitionCommand } from '../../src/commands/definition';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { TextDocuments } from 'vscode-languageserver/node';
import { mock } from 'jest-mock-extended';
import { Logger } from '../../src/services/logger';
import * as ts from 'typescript';
import { when } from 'jest-when';
import { SourceFileCreator } from '../../src/services/sourceFileCreator';

describe('DefinitionCommand', () => {
  let uut: DefinitionCommand;
  let documents: jest.Mocked<TextDocuments<TextDocument>>;
  let logger: jest.Mocked<Logger>;
  let sourceFileCreator: jest.Mocked<SourceFileCreator>;

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
    uut = new DefinitionCommand(documents, logger, sourceFileCreator);
  });

  it('should return undefined when cursor is not on a provider', async () => {
    const params = createParams()
    const document = mock<TextDocument>();
    when(sourceFileCreator.create).calledWith(document).mockReturnValue(mock<ts.SourceFile>());
    when(documents.get).calledWith(params.textDocument.uri).mockReturnValue(document);

    const result = await uut.onDefinition(params);

    expect(result).toBeUndefined();
  });

  it('should return the provider definition when cursor is on a provider', async () => {
    const params = createParams()
    const document = mock<TextDocument>();
    when(document.offsetAt).calledWith(params.position).mockReturnValue(TEST_SOURCE.indexOf('bar: string'));
    const sourceFile = ts.createSourceFile('test.ts', TEST_SOURCE, ts.ScriptTarget.Latest, true);
    when(sourceFileCreator.create).calledWith(document).mockReturnValue(sourceFile);
    when(documents.get).calledWith(params.textDocument.uri).mockReturnValue(document);

    const result = await uut.onDefinition(params);

    expect(result).toBeDefined();
  });
});

function createParams() {
  return {
    textDocument: { uri: 'test.ts' },
    position: { line: 0, character: 0 }
  };
}
