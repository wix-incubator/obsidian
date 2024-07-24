import type { Type } from './type';

export class MissingType implements Type {
  constructor() {}

  toString(): string[] {
    return [];
  }

  isEmpty(): boolean {
    return true;
  }

  equals(types: Type[]): boolean {
    return types.length === 0 || types.length === 1 && types[0].isEmpty();
  }
}