import type { TSESTree } from '@typescript-eslint/types';
import type { Type } from './type';
import { Identifier } from './identifier';

export class SingleType implements Type {
  constructor(private props: TSESTree.Identifier) {}

  asString(): string[] {
    const typeRef = this.props?.typeAnnotation?.typeAnnotation as TSESTree.TSTypeReference;
    return [new Identifier(typeRef.typeName).name];
  }
}