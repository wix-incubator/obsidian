import { DefinitionTestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'dependency in external subgraph',
  entryPoint: path.resolve(__dirname, './sourceCodes/entryPoint.ts'),
  position: {
    line: 6,
    character: 8
  },
  result: {
    uri: path.resolve(__dirname, '../../../../../tests/fixtures/external-lib-d/externalGraphD.ts'),
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