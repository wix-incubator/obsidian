import { CompletionItemKind, InsertTextFormat } from "vscode-languageserver";
import { CompletionTestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'graph with subgraph',
  entryPoint: path.resolve(__dirname, './sourceCodes/graphWithSubgraph.ts'),
  position: {
    line: 6,
    character: 12
  },
  result: [
    {
      label: 'bar',
      kind: CompletionItemKind.Value,
      insertText: 'bar: string',
      insertTextFormat: InsertTextFormat.Snippet,
      detail: '(string) bar: string'
    },
    {
      label: 'baz',
      kind: CompletionItemKind.Value,
      insertText: 'baz: string',
      insertTextFormat: InsertTextFormat.Snippet,
      detail: '(string) baz: string'
    }
  ]
} satisfies CompletionTestCase;
