import { Definition, Position } from "vscode-languageserver/node";

type Path = string;

export declare type TestCase = {
  entryPoint: Path;
  position: Position;
  result: Definition;
};

declare type SourceCode = {
  path: Path;
  content: string;
};
