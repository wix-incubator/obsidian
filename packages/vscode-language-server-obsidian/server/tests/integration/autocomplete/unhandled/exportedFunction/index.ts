import { UnhandledCompletionTestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'Exported function',
  entryPoint: path.resolve(__dirname, './exportedFunction.ts'),
  position: {
    line: 0,
    character: 21
  },
} satisfies UnhandledCompletionTestCase;