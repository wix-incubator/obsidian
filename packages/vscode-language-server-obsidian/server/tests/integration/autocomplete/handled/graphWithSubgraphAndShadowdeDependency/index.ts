import { CompletionItemKind, InsertTextFormat } from "vscode-languageserver";
import { CompletionTestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'graph with subgraph and shadowed dependency',
  entryPoint: path.resolve(__dirname, './sourceCodes/graphWithSubgraph.ts'),
  position: {
    line: 6,
    character: 12
  },
  result: [
    {
      label: 'bar',
      // TODO: Use correct kind
      kind: CompletionItemKind.Class,
      insertText: 'bar: string',
      insertTextFormat: InsertTextFormat.Snippet,
      detail: 'string'
    },
    {
      label: 'baz',
      kind: CompletionItemKind.Class,
      insertText: 'baz: string',
      insertTextFormat: InsertTextFormat.Snippet,
      detail: 'string'
    }
  ]
} satisfies CompletionTestCase;