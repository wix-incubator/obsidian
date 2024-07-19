import type { TSESTree } from '@typescript-eslint/types';
import { assertDefined } from '../utils/assertions';
import { Identifier } from './identifier';

export class Generics {
  constructor(node: TSESTree.TSTypeParameterInstantiation | undefined);
  constructor(readonly node: TSESTree.TSTypeParameterInstantiation) {
    assertDefined(node);
  }

  get types(): string[] {
    return this.params
      .map((param: TSESTree.TSTypeReference) => {
        return new Identifier(param.typeName).name;
      });
  }

  private get params() {
    return this.node.params as TSESTree.TSTypeReference[];
  }
}