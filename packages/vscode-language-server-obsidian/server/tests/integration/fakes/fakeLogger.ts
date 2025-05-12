import { mockDeep } from "jest-mock-extended";
import { Logger } from "../../../src/services/logger";

export class FakeLogger extends Logger {
  constructor () {
    super(mockDeep());
  }
}
