import { UnhandledDefinitionTestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'single class argument',
  entryPoint: path.resolve(__dirname, './sourceCodes/entryPoint.ts'),
  position: {
    line: 6,
    character: 28
  },
} satisfies UnhandledDefinitionTestCase;