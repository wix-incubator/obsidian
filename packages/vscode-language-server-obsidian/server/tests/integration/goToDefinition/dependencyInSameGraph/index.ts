import { TestCase } from "../../index";
import * as path from 'path';

export default {
  entryPoint: path.resolve(__dirname, './sourceCodes/themeGraph.ts'),
  position: {
    line: 6,
    character: 8
  },
  result: {
    uri: path.resolve(__dirname, './sourceCodes/themeGraph.ts'),
    range: {
      start: {
        line: 11,
        character: 2
      },
      end: {
        line: 14,
        character: 4
      }
    }
  }
} satisfies TestCase;