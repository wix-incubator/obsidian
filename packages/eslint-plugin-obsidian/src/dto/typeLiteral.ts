import type { Type } from './type';

export class TypeLiteral implements Type {
  static isTypeLiteral(type: Type): type is TypeLiteral {
    return type instanceof TypeLiteral;
  }

  toString(): string[] {
    throw new Error('Method not implemented.');
  }

  isEmpty(): boolean {
    throw new Error('Method not implemented.');
  }

  equals(types: Type[]): boolean {
    return types.length === 1 && types[0].toString() === this.toString();
  }
}
