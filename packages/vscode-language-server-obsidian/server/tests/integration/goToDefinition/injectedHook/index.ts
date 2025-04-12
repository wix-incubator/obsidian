import { TestCase } from "../../index";
import { entryGraph, entryPoint, entryViewModel } from "./sourceCodes";

export default {
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
} satisfies TestCase;