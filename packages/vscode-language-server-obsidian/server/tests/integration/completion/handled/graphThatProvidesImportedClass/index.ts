import { CompletionItemKind, InsertTextFormat } from "vscode-languageserver";
import { CompletionTestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'graph that provides imported class',
  entryPoint: path.resolve(__dirname, './sourceCodes/graph.ts'),
  position: {
    line: 6,
    character: 12
  },
  result: [
    {
      label: 'clazz',
      kind: CompletionItemKind.Class,
      insertText: 'clazz: Clazz',
      insertTextFormat: InsertTextFormat.Snippet,
      detail: '(class) clazz: Clazz'
    }
  ]
} satisfies CompletionTestCase;
