import { CompletionItemKind } from "vscode-languageserver";
import { CompletionTestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'graph without subgraphs',
  entryPoint: path.resolve(__dirname, './sourceCodes/graphWithoutSubgraphs.ts'),
  position: {
    line: 6,
    character: 14
  },
  result: [
    {
      label: 'foo',
      // TODO: Use correct kind
      kind: CompletionItemKind.Class,
      labelDetails: {
        detail: 'string'
      }
    },
    {
      label: 'bar',
      kind: CompletionItemKind.Class,
      labelDetails: {
        detail: 'string'
      }
    }
  ]
} satisfies CompletionTestCase;