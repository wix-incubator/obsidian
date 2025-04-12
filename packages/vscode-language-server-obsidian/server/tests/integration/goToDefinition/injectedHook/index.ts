import { TestCase, TestCaseGenerator } from "../..";
import { entryGraph, entryPoint, entryViewModel } from "./sourceCodes";

type InjectedHookOptions = {};

const injectedHook: TestCaseGenerator<InjectedHookOptions> = (options = {}) => {
  return {
    entryPoint,
    position: {
      line: 10,
      character: 20
    },
    additionalSourceCodes: [
      entryGraph,
      entryViewModel,
    ],
    result: {
      uri: '/model/entryViewModel.ts',
      range: {
        start: {
          line: 3,
          character: 13
        },
        end: {
          line: 7,
          character: 1
        }
      }
    }
  };
};

export default injectedHook;