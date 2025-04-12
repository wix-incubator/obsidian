import { TestCase, TestCaseGenerator } from "../..";
import { entryPoint } from "./sourceCodes/themeGraph";

type DependencyInSameGraphOptions = {};

const dependencyInSameGraph: TestCaseGenerator<DependencyInSameGraphOptions> = (options = {}) => {
  return {
    entryPoint,
    position: {
      line: 10,
      character: 8
    },
    result: {
      uri: '/model/themeGraph.ts',
      range: {
        start: {
          line: 15,
          character: 2
        },
        end: {
          line: 18,
          character: 4
        }
      }
    }
  };
};

export default dependencyInSameGraph;