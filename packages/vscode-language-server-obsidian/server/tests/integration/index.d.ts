import { Definition, Position } from "vscode-languageserver/node";

export declare type TestCase = {
  entryPoint: SourceCode;
  position: Position;
  additionalSourceCodes?: SourceCode[];
  result: Definition;
}

declare type SourceCode = {
  path: string;
  content: string;
}
