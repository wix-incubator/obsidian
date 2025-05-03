import { DefinitionTestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'injected export default class',
  entryPoint: path.resolve(__dirname, './sourceCodes/entryPoint.ts'),
  position: {
    line: 10,
    character: 33
  },
  result: {
    uri: path.resolve(__dirname, './sourceCodes/gameModel.ts'),
    range: {
      start: {
        line: 2,
        character: 0
      },
      end: {
        line: 4,
        character: 1
      }
    }
  }
} satisfies DefinitionTestCase;