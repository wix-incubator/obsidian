const ts = require("typescript") as typeof import("typescript");

export function createSourceFile(source: string, uri: string = 'test.ts') {
  return ts.createSourceFile(uri, source, ts.ScriptTarget.Latest, true);
}
