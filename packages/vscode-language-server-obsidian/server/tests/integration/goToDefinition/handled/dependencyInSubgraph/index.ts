import { TestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'dependency in subgraph',
  entryPoint: path.resolve(__dirname, './sourceCodes/entryPoint.ts'),
  position: {
    line: 7,
    character: 8
  },
  result: {
    uri: path.resolve(__dirname, './sourceCodes/frameworkGraph.ts'),
    range: {
      start: {
        line: 6,
        character: 2
      },
      end: {
        line: 9,
        character: 4
      }
    }
  }
} satisfies TestCase;