import { ProjectAdapter } from "../../../src/services/project/projectAdapter";
import { ProjectRegistry, TsConfigParser } from "ts-morph-extensions";
import { FakeLogger } from "../fakes/fakeLogger";
import * as path from 'path';

export function createTestProjectAdapter(): ProjectAdapter {
  const projectRegistry = new ProjectRegistry(
    new FakeLogger(),
    new TsConfigParser(),
    { overrideTsConfigPath: path.resolve(__dirname, '../tsconfig.tests.json') }
  );
  return new ProjectAdapter(projectRegistry);
} 