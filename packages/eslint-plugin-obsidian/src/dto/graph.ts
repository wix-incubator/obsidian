import { Clazz } from './class';
import { TSESTree } from '@typescript-eslint/types';

export class Graph extends Clazz {
  public static asGraph(clazz: Clazz) {
    if (!clazz.isGraph) throw new Error('Class is not a graph');
    return new Graph(clazz.node);
  }

  constructor(node: TSESTree.ClassDeclaration) {
    super(node);
  }

  public requireProvider(name: string) {
    return this.findProvider(name)!;
  }

  public findProvider(name: string) {
    return this.providers.find(method => method.name === name);
  }

  public get providers() {
    return this.getDecoratedMethods('Provides');
  }
}
