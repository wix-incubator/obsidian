import { TestCaseParams } from "..";

export function createParams(testCase: TestCaseParams) {
  return {
    textDocument: { uri: testCase.entryPoint },
    position: testCase.position
  };
}