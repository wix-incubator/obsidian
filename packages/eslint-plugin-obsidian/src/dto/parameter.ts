import type { TSESTree } from '@typescript-eslint/types';

export class Parameter {
  constructor(public readonly node: TSESTree.Parameter) {}

  get name() {
    return (this.node as TSESTree.Identifier).name;
  }
}
