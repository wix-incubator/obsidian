import { IgnoredDefinitionTestCase } from "../../..";
import * as path from 'path';

export default {
  name: 'class passed via props',
  entryPoint: path.resolve(__dirname, './sourceCodes/entryPoint.ts'),
  position: {
    line: 6,
    character: 28
  },
} satisfies IgnoredDefinitionTestCase;