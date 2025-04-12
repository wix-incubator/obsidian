import { TestCase, TestCaseGenerator } from "../..";
import { entryPoint } from "./sourceCodes/entryPoint";
import { frameworkGraph } from "./sourceCodes/frameworkGraph";

type DependencyInSubgraphOptions = {};

const dependencyInSubgraph: TestCaseGenerator<DependencyInSubgraphOptions> = (options = {}) => {
  return {
    entryPoint,
    additionalSourceCodes: [
      frameworkGraph,
    ],
    position: {
      line: 15,
      character: 8
    },
    result: {
      uri: '/framework/di/FrameworkGraph.ts',
      range: {
        start: {
          line: 8,
          character: 2
        },
        end: {
          line: 11,
          character: 4
        }
      }
    }
  };
};

export default dependencyInSubgraph;