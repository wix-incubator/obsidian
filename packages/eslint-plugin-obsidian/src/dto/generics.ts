import type { TSESTree } from '@typescript-eslint/types';
import { assertDefined } from '../utils/assertions';
import { isTypeLiteral } from '../utils/ast';
import { TypeLiteral } from './types/typeLiteral';
import type { Type } from './types/type';
import { TypeReference } from './types/typeReference';

export class Generics {
  static EMPTY = new Generics({ params: [] } as unknown as TSESTree.TSTypeParameterInstantiation);

  constructor(node: TSESTree.TSTypeParameterInstantiation | undefined);
  constructor(readonly node: TSESTree.TSTypeParameterInstantiation) {
    assertDefined(node);
  }

  get types(): Type[] {
    return this.params
      .map((param: TSESTree.TSTypeReference) => {
        return isTypeLiteral(param) ? new TypeLiteral() : new TypeReference(param);
      });
  }

  private get params() {
    return this.node.params as TSESTree.TSTypeReference[];
  }
}
