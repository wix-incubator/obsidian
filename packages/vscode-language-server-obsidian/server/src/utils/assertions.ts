import ts = require("typescript");
import { hasProvidesDecorator } from "./decorators";

export function assert<T>(message: string, object: T): asserts object is NonNullable<T> {
  if (object === undefined) {
    throw new Error(message);
  }
}
