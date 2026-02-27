import { DefinitionTestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'dependency in abstract base graph',
  entryPoint: path.resolve(__dirname, './sourceCodes/abstractApplicationGraph.ts'),
  position: {
    line: 5,
    character: 13
  },
  result: {
    uri: path.resolve(__dirname, './sourceCodes/abstractPortsGraph.ts'),
    range: {
      start: {
        line: 4,
        character: 2
      },
      end: {
        line: 4,
        character: 39
      }
    }
  }
} satisfies DefinitionTestCase;
