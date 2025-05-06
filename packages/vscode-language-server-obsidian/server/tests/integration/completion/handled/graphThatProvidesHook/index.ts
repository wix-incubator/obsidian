import { CompletionItemKind, InsertTextFormat } from "vscode-languageserver";
import { CompletionTestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'graph that provides hook',
  entryPoint: path.resolve(__dirname, './sourceCodes/graphThatProvidesHook.ts'),
  position: {
    line: 5,
    character: 12
  },
  result: [
    {
      label: 'useBar',
      kind: CompletionItemKind.Function,
      insertText: 'useBar: () => string',
      insertTextFormat: InsertTextFormat.Snippet,
      detail: '(function) useBar: () => string'
    }
  ]
} satisfies CompletionTestCase;
