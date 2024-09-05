import type { TSESTree } from '@typescript-eslint/types';
import { isEqual } from 'lodash';
import type { Type } from './type';
import { Identifier } from '../identifier';

export class SingleType implements Type {
  constructor(private props: TSESTree.Identifier) {}

  toString(): string[] {
    const typeRef = this.props?.typeAnnotation?.typeAnnotation as TSESTree.TSTypeReference;
    return [new Identifier(typeRef.typeName).name];
  }

  isEmpty(): boolean {
    return false;
  }

  equals(types: Type[]): boolean {
    return types.length === 1 && types[0].toString() === this.toString();
  }

  includes(type: Type[]): boolean {
    return type.some(t => isEqual(t.toString(), this.toString()));
  }

  size(): number {
    return 1;
  }
}
