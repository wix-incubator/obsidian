import { IgnoredTestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'class passed via props',
  entryPoint: path.resolve(__dirname, './sourceCodes/entryPoint.ts'),
  position: {
    line: 2,
    character: 24
  },
} satisfies IgnoredTestCase;