import type { TSESTree } from '@typescript-eslint/types';
import { Type } from './type';
import { Identifier } from './identifier';

export class TypeIntersection implements Type {
  constructor(private typeAnnotation: TSESTree.TSIntersectionType) {}

  asString(): string[] {
    return this.typeAnnotation.types.map((type) => {
      const typeRef = type as TSESTree.TSTypeReference;
      return new Identifier(typeRef.typeName).name;
    });
  }
}
