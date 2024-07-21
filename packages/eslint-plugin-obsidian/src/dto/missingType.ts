import type { Type } from './type';

export class MissingType implements Type {
  constructor() {}

  asString(): string[] {
    return [];
  }
}