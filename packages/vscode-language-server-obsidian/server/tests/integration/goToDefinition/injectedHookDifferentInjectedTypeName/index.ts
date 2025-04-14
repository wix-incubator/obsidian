import { TestCase } from "../../index";
import * as path from 'path';

export default {
  entryPoint: path.resolve(__dirname, './sourceCodes/component.ts'),
  position: {
    line: 9,
    character: 20
  },
  result: {
    uri: path.resolve(__dirname, './sourceCodes/entryViewModel.ts'),
    range: {
      start: {
        line: 2,
        character: 13
      },
      end: {
        line: 6,
        character: 1
      }
    }
  }
} satisfies TestCase;