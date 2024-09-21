import { isEqual, uniqueId } from 'lodash';
import type { Type } from './type';

export class TypeLiteral implements Type {
  private readonly name = uniqueId('TypeLiteral');

  static isTypeLiteral(this: void, type: Type): type is TypeLiteral {
    return type instanceof TypeLiteral;
  }

  toString(): string[] {
    return [this.name];
  }

  isEmpty(): boolean {
    throw new Error('Method not implemented.');
  }

  equals(types: Type[]): boolean {
    return types.length === 1 && types[0].toString() === this.toString();
  }

  includes(type: Type[]): boolean {
    return type.every(t => isEqual(t.toString(), this.toString()));
  }

  size(): number {
    return 1;
  }
}
