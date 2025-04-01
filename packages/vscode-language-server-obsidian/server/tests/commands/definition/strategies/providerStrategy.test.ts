import { mock } from "jest-mock-extended";
import { ProviderStrategy } from "../../../../src/commands/definition/strategies/providerStrategy";
import { Logger } from "../../../../src/services/logger";
import { SourceFileCreator } from "../../../../src/services/sourceFileCreator";
import { TextDocument } from "vscode-languageserver-textdocument";
import { when } from "jest-when";
import { findNodeByText } from "../../../../src/utils/node";
const ts = require("typescript") as typeof import("typescript");

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

describe('ProviderStrategy', () => {
  let uut: ProviderStrategy;
  let logger: jest.Mocked<Logger>;
  let sourceFileCreator: jest.Mocked<SourceFileCreator>;

  beforeEach(() => {
    logger = mock();
    sourceFileCreator = mock();
    uut = new ProviderStrategy(logger, sourceFileCreator);
  });

  it('should return undefined when cursor is not on a provider', async () => {
    const result = await uut.goToDefinition(mock(), mock());
    expect(result).toBeUndefined();
  });

  it('should return the provider definition when cursor is on a provider', async () => {
    const params = createParams()
    const document = mock<TextDocument>();
    when(document.offsetAt).calledWith(params.position).mockReturnValue(TEST_SOURCE.indexOf('bar: string'));
    const sourceFile = ts.createSourceFile('test.ts', TEST_SOURCE, ts.ScriptTarget.Latest, true);
    when(sourceFileCreator.create).calledWith(document).mockReturnValue(sourceFile);

    const node = findNodeByText(sourceFile.statements[0], 'bar: string')!;
    const result = await uut.goToDefinition(node, document);

    expect(result).toBeDefined();
  });

  function createParams() {
    return {
      textDocument: { uri: 'test.ts' },
      position: { line: 0, character: 0 }
    };
  }
});