import { Definition, Position } from "vscode-languageserver/node";

export declare type TestCase = {
  entryPoint: SourceCode;
  position: Position;
  sourceCodes: SourceCode[];
  result: Definition;
}

declare type SourceCode = {
  path: string;
  content: string;
}
