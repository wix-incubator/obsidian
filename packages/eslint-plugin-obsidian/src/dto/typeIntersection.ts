import type { TSESTree } from '@typescript-eslint/types';
import { isEqual } from 'lodash';
import { Type } from './type';
import { Identifier } from './identifier';

export class TypeIntersection implements Type {
  constructor(private typeAnnotation: TSESTree.TSIntersectionType) { }

  toString(): string[] {
    return this.typeAnnotation.types.map((type) => {
      const typeRef = type as TSESTree.TSTypeReference;
      return new Identifier(typeRef.typeName).name;
    });
  }

  isEmpty(): boolean {
    return this.typeAnnotation.types.length === 0;
  }

  equals(types: Type[]): boolean {
    return isEqual(this.toString(),types.map((type) => type.toString()).flat());
  }
}
