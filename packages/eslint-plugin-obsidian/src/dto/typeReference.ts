import type { TSESTree } from '@typescript-eslint/types';
import { isEqual } from 'lodash';
import type { Type } from './type';
import { Identifier } from './identifier';

export class TypeReference implements Type {
  constructor(private node: TSESTree.TSTypeReference) {}

  toString(): string[] {
    return [new Identifier(this.node.typeName).name];
  }

  isEmpty(): boolean {
    return false;
  }

  equals(types: Type[]): boolean {
    const a = this.toString();
    const b = types.map((type) => type.toString()).flat();
    return isEqual(a, b);
  }
}