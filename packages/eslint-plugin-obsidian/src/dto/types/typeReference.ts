import type { TSESTree } from '@typescript-eslint/types';
import { isEqual } from 'lodash';
import type { Type } from './type';
import { Identifier } from '../identifier';

export class TypeReference implements Type {
  constructor(private node: TSESTree.TSTypeReference) { }

  toString(): string[] {
    return [new Identifier(this.node.typeName).name];
  }

  isEmpty(): boolean {
    return false;
  }

  equals(types: Type[]): boolean {
    return isEqual(this.toString(), types.map(type => type.toString()).flat());
  }

  includes(type: Type[]): boolean {
    return type.some(t => isEqual(this.toString(), t.toString()));
  }

  size(): number {
    return 1;
  }
}
