import type { TSESTree } from '@typescript-eslint/types';
import { isTypeIntersection } from '../utils/ast';
import { Identifier } from './identifier';

export class FunctionalComponent {
  constructor(private node: TSESTree.ArrowFunctionExpression) {}

  get propsType(): string[] {
    const typeAnnotation = this.props.typeAnnotation?.typeAnnotation;
    if (isTypeIntersection(typeAnnotation)) {
      const types = typeAnnotation.types.map((type) => {
        const typeRef = type as TSESTree.TSTypeReference;
        return new Identifier(typeRef.typeName).name;
      });
      return types;
    }
    return [];
  }

  get props(): TSESTree.Identifier {
    return this.node.params[0] as TSESTree.Identifier;
  }
}