import { TestCase } from "../..";
import { entryPoint } from "./sourceCodes/entryPoint";
import { frameworkGraph } from "./sourceCodes/frameworkGraph";
export default {
  entryPoint,
  additionalSourceCodes: [
    frameworkGraph,
  ],
  position: {
    line: 15,
    character: 8
  },
  result: {
    uri: '/framework/di/FrameworkGraph.ts',
    range: {
      start: {
        line: 8,
        character: 2
      },
      end: {
        line: 11,
        character: 4
      }
    }
  }
} satisfies TestCase;