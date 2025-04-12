import { TestCase } from "../..";
import { entryGraphContent } from "./sourceCodes/entryGraph";
import { entryPoint } from "./sourceCodes/entryPoint";
import { gameGraph } from "./sourceCodes/gameGraph";
import { gameModel } from "./sourceCodes/gameModel";

export default {
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
} satisfies TestCase;