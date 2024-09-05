import type { TSESTree } from '@typescript-eslint/types';

export class Property {
  constructor(private node: TSESTree.Property) {}

  getValue<T>() {
    return this.node.value as T;
  }
}
