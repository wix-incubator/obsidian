import { CompletionItemKind, InsertTextFormat } from "vscode-languageserver";
import { CompletionTestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'graph without subgraphs',
  entryPoint: path.resolve(__dirname, './sourceCodes/graphWithoutSubgraphs.ts'),
  position: {
    line: 5,
    character: 12
  },
  result: [
    {
      label: 'bar',
      kind: CompletionItemKind.Value,
      insertText: 'bar: string',
      insertTextFormat: InsertTextFormat.Snippet,
      detail: '(string) bar: string'
    }
  ]
} satisfies CompletionTestCase;