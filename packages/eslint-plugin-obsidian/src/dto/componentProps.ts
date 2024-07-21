import type { TSESTree } from '@typescript-eslint/types';
import { isTypeAnnotation, isTypeIntersection } from '../utils/ast';
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
    switch (true) {
      case isTypeIntersection(typeAnnotation): return new TypeIntersection(typeAnnotation);
      case isTypeAnnotation(props?.typeAnnotation): return new SingleType(props);
      default: return new MissingType();
    }
  }
}