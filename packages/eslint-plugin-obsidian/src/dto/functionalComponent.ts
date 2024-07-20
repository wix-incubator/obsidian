import type { TSESTree } from '@typescript-eslint/types';
import { isTypeAnnotation, isTypeIntersection } from '../utils/ast';
import { Identifier } from './identifier';

export class FunctionalComponent {
  constructor(private node: TSESTree.ArrowFunctionExpression) {}

  get propsType(): string[] {
    const typeAnnotation = this.props?.typeAnnotation?.typeAnnotation;
    if (isTypeIntersection(typeAnnotation)) {
      const types = typeAnnotation.types.map((type) => {
        const typeRef = type as TSESTree.TSTypeReference;
        return new Identifier(typeRef.typeName).name;
      });
      return types;
    }
    if (isTypeAnnotation(this.props?.typeAnnotation)) {
      const typeRef = this.props?.typeAnnotation?.typeAnnotation as TSESTree.TSTypeReference;
      return [new Identifier(typeRef.typeName).name];
    }
    return [];
  }

  get props(): TSESTree.Identifier | undefined {
    return this.node.params[0] as TSESTree.Identifier;
  }
}