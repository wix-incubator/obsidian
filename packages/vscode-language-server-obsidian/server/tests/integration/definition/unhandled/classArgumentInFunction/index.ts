import { UnhandledDefinitionTestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'class argument in function',
  entryPoint: path.resolve(__dirname, './sourceCodes/entryPoint.ts'),
  position: {
    line: 2,
    character: 24
  },
} satisfies UnhandledDefinitionTestCase;
