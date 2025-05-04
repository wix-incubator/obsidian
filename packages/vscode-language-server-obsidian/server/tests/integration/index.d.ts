import { Definition, Position, CompletionItem } from "vscode-languageserver/node";

type Path = string;


export type DefinitionTestCase = TestCase<Definition>;
export type UnhandledDefinitionTestCase = Omit<DefinitionTestCase, 'result'>;

export type CompletionTestCase = TestCase<CompletionItem[]>;
export type UnhandledCompletionTestCase = Omit<CompletionTestCase, 'result'>;

type TestCase<T> = {
  name: string;
  entryPoint: Path;
  position: Position;
  result: T;
};

type SourceCode = {
  path: Path;
  content: string;
};
