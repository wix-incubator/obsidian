import { DefinitionTestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'dependency in private subgraph',
  entryPoint: path.resolve(__dirname, './sourceCodes/entryPoint.ts'),
  position: {
    line: 6,
    character: 10
  },
  result: {
    uri: path.resolve(__dirname, './sourceCodes/privateSubgraph.ts'),
    range: {
      start: {
        line: 17,
        character: 2
      },
      end: {
        line: 27,
        character: 4
      }
    }
  }
} satisfies DefinitionTestCase;

