import type { Type } from './type';

export class MissingType implements Type {
  toString(): string[] {
    return [];
  }

  isEmpty(): boolean {
    return true;
  }

  equals(types: Type[]): boolean {
    return types.length === 0 || (types.length === 1 && types[0].isEmpty());
  }

  includes(): boolean {
    return false;
  }

  size(): number {
    return 0;
  }
}
