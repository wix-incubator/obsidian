import { Definition, Position } from "vscode-languageserver/node";

type Path = string;

export declare type IgnoredTestCase = Omit<TestCase, 'result'>;

export declare type TestCase = {
  name: string;
  entryPoint: Path;
  position: Position;
  result: Definition;
};

declare type SourceCode = {
  path: Path;
  content: string;
};
