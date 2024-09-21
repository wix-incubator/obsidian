import type { TSESTree } from '@typescript-eslint/types';

export class Identifier {
  constructor(node: TSESTree.Node);
  constructor(private node: TSESTree.Identifier) {}

  get name(): string {
    return this.node.name;
  }
}
