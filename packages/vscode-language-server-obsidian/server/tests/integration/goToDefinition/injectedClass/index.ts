import { TestCase, TestCaseGenerator } from "../..";
import { entryGraphContent } from "./sourceCodes/entryGraph";
import { entryPoint } from "./sourceCodes/entryPoint";
import { gameGraph } from "./sourceCodes/gameGraph";
import { gameModel } from "./sourceCodes/gameModel";

type InjectedClassOptions = {};

const injectedClass: TestCaseGenerator<InjectedClassOptions> = (options = {}) => {
  return {
    entryPoint,
    additionalSourceCodes: [
      gameGraph,
      entryGraphContent,
      gameModel
    ],
    position: {
      line: 10,
      character: 33
    },
    result: {
      uri: '/core/model/GameModel.ts',
      range: {
        start: {
          line: 7,
          character: 0
        },
        end: {
          line: 34,
          character: 1
        }
      }
    }
  };
};

export default injectedClass;