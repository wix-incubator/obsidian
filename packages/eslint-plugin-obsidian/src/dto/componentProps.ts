import type { TSESTree } from '@typescript-eslint/types';
import {
  isAnyType,
  isTypeAnnotation,
  isTypeIntersection,
  isTypeReference,
} from '../utils/ast';
import { SingleType } from './types/singleType';
import { TypeIntersection } from './types/typeIntersection';
import { MissingType } from './types/missingType';
import type { Type } from './types/type';
import { TypeReference } from './types/typeReference';

export class ComponentProps {
  constructor(props: TSESTree.Parameter);
  constructor(private props: TSESTree.Identifier) { }

  get type(): Type {
    const typeAnnotation = this.props?.typeAnnotation?.typeAnnotation;
    if (!typeAnnotation) return new MissingType();
    if (isTypeIntersection(typeAnnotation)) return new TypeIntersection(typeAnnotation);
    if (isAnyType(typeAnnotation)) return new MissingType();
    if (isTypeReference(typeAnnotation)) return new TypeReference(typeAnnotation);
    if (isTypeAnnotation(this.props?.typeAnnotation)) return new SingleType(this.props);
    return new MissingType();
  }
}
