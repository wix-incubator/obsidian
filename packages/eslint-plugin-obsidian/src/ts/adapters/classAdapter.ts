import { ProjectRegistry , Graph } from 'ts-morph-extensions';
import type { TSESTree } from '@typescript-eslint/types';

export class ClassAdapter {
  constructor(private readonly projectRegistry: ProjectRegistry) { }

  public classToGraph(node: TSESTree.ClassDeclaration, filePath: string): Graph | undefined {
    if (!node.id?.name) return;
    const clazz = this.projectRegistry.getSourceFile(filePath)?.getClass(node.id.name);
    return clazz ? new Graph(clazz) : undefined;
  }
}
