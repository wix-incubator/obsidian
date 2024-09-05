import type { TSESTree } from '@typescript-eslint/types';
import { isEqual } from 'lodash';
import { Type } from './type';
import { Identifier } from '../identifier';
import { TypeReference } from './typeReference';

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
    return isEqual(this.toString(), types.map(type => type.toString()).flat());
  }

  includes(type: Type[]): boolean {
    return this.types.every(t => t.includes(type));
  }

  private get types(): Type[] {
    return this.typeAnnotation.types.map((type) => {
      return new TypeReference(type as TSESTree.TSTypeReference);
    });
  }

  size(): number {
    return this.typeAnnotation.types.length;
  }
}
