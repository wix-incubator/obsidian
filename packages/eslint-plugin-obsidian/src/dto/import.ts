import type { TSESTree } from '@typescript-eslint/types';

export class Import {
  constructor(private node: TSESTree.ImportDeclaration) { }

  get path() {
    return this.node.source.value;
  }

  public includes(name: string) {
    return this.node.specifiers
      .map(specifier => specifier.local.name)
      .includes(name);
  }
}
