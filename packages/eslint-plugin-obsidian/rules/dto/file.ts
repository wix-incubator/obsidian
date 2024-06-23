import type { TSESTree } from '@typescript-eslint/types';

export class File {
  constructor(private program: TSESTree.Program) { }

  public findGraph(name: string) {
    return this.classNodes.find((node) => {
      return node.id?.name === name;
    });
  }

  private get classNodes() {
    return this.body.filter((node) => {
      return node.type === 'ClassDeclaration';
    }) as TSESTree.ClassDeclaration[];
  }

  private get body() {
    return this.program.body;
  }
}
