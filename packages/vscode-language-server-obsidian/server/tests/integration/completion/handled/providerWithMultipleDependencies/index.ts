import { CompletionItemKind, InsertTextFormat } from "vscode-languageserver";
import { CompletionTestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'provider with multiple dependencies',
  entryPoint: path.resolve(__dirname, './sourceCodes/graph.ts'),
  position: {
    line: 5,
    character: 26
  },
  result: [
    {
      label: 'baz',
      kind: CompletionItemKind.Value,
      insertText: 'baz: string',
      insertTextFormat: InsertTextFormat.Snippet,
      detail: '(string) baz: string'
    }
  ]
} satisfies CompletionTestCase;
