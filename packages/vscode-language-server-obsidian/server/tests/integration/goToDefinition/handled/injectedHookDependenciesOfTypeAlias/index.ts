import { TestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'injected hook dependenciesOf type alias',
  entryPoint: path.resolve(__dirname, './sourceCodes/entryPoint.ts'),
  position: {
    line: 9,
    character: 29
  },
  result: {
    uri: path.resolve(__dirname, './sourceCodes/entryViewModel.ts'),
    range: {
      start: {
        line: 3,
        character: 13
      },
      end: {
        line: 7,
        character: 1
      }
    }
  }
} satisfies TestCase;