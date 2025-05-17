import { DefinitionTestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'dependency in nested subgraph',
  entryPoint: path.resolve(__dirname, './sourceCodes/entryPoint.ts'),
  position: {
    line: 7,
    character: 8
  },
  result: {
    uri: path.resolve(__dirname, './sourceCodes/networkGraph.ts'),
    range: {
      start: {
        line: 5,
        character: 2
      },
      end: {
        line: 8,
        character: 4
      }
    }
  }
} satisfies DefinitionTestCase;