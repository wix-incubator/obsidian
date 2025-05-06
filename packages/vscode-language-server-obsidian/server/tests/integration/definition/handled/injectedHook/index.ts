import * as path from "path";
import { DefinitionTestCase } from "../../../index";

export default {
  name: 'injected hook',
  entryPoint: path.resolve(__dirname, './sourceCodes/component.ts'),
  position: {
    line: 9,
    character: 20
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
} satisfies DefinitionTestCase;