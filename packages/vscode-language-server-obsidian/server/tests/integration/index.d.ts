import { Definition, Position, CompletionItem } from "vscode-languageserver/node";

type Path = string;

export type DefinitionTestCase = TestCase<Definition>;
export type UnhandledDefinitionTestCase = Omit<DefinitionTestCase, 'result'>;

export type CompletionTestCase = TestCase<CompletionItem[]>;
export type UnhandledCompletionTestCase = Omit<CompletionTestCase, 'result'>;

export type TestCaseParams = {
  name: string;
  entryPoint: Path;
  position: Position;
};

export type TestCase<T> = TestCaseParams & {
  result: T;
};

type SourceCode = {
  path: Path;
  content: string;
};
