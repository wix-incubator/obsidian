import * as path from "path";
import { TestCase } from "../../index";

export default {
  name: 'injected hook typed provider',
  entryPoint: path.resolve(__dirname, './sourceCodes/component.ts'),
  position: {
    line: 9,
    character: 20
  },
  result: {
    uri: path.resolve(__dirname, './sourceCodes/entryViewModel.ts'),
    range: {
      start: {
        line: 5,
        character: 13
      },
      end: {
        line: 9,
        character: 1
      }
    }
  }
} satisfies TestCase;