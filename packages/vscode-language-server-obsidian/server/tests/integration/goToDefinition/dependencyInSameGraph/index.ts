import { TestCase } from "../../index";
import { entryPoint } from "./sourceCodes/themeGraph";

export default {
  entryPoint,
  position: {
    line: 10,
    character: 8
  },
  result: {
    uri: '/model/themeGraph.ts',
    range: {
      start: {
        line: 15,
        character: 2
      },
      end: {
        line: 18,
        character: 4
      }
    }
  }
} satisfies TestCase;