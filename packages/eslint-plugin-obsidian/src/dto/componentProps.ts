import type { TSESTree } from '@typescript-eslint/types';
import { isAnyType, isTypeAnnotation, isTypeIntersection } from '../utils/ast';
import { SingleType } from './singleType';
import { TypeIntersection } from './typeIntersection';
import { MissingType } from './missingType';
import type { Type } from './type';

export class ComponentProps {
  constructor(private node: TSESTree.ArrowFunctionExpression) { }

  get type(): Type {
    const props = this.node.params[0] as TSESTree.Identifier;
    const typeAnnotation = props?.typeAnnotation?.typeAnnotation;
    return this.getType(typeAnnotation, props);
  }

  private getType(typeAnnotation: TSESTree.TypeNode | undefined, props: TSESTree.Identifier) {
    if (!typeAnnotation) return new MissingType();
    if (isTypeIntersection(typeAnnotation)) return new TypeIntersection(typeAnnotation);
    if (isAnyType(typeAnnotation)) return new MissingType();
    if (isTypeAnnotation(props?.typeAnnotation)) return new SingleType(props);
    return new MissingType();
  }
}