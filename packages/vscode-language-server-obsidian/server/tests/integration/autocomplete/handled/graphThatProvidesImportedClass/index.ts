import { CompletionItemKind, InsertTextFormat } from "vscode-languageserver";
import { CompletionTestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'graph without subgraphs',
  entryPoint: path.resolve(__dirname, './sourceCodes/graph.ts'),
  position: {
    line: 6,
    character: 12
  },
  result: [
    {
      label: 'clazz',
      // TODO: Use correct kind
      kind: CompletionItemKind.Class,
      insertText: 'clazz: Clazz',
      insertTextFormat: InsertTextFormat.Snippet,
      detail: 'Clazz'
    }
  ]
} satisfies CompletionTestCase;