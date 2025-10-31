import { ProjectRegistry , Graph } from 'ts-morph-extensions';
import type { TSESTree } from '@typescript-eslint/types';
import { SourceFile, SyntaxKind } from 'ts-morph';

export class ClassAdapter {
  constructor(private readonly projectRegistry: ProjectRegistry) { }

  public classToGraph(node: TSESTree.ClassDeclaration, filePath: string): Graph | undefined {
    if (!node.id?.name) return;
    const sourceFile = this.projectRegistry.getSourceFile(filePath);
    let clazz = this.topLevelClass(sourceFile, node.id.name) ?? this.nestedClass(sourceFile, node.id.name);
    return clazz && new Graph(clazz);
  }

  private topLevelClass(sourceFile: SourceFile | undefined, className: string) {
    return sourceFile?.getClass(className);
  }

  private nestedClass(sourceFile: SourceFile | undefined, className: string) {
    const allClasses = sourceFile?.getDescendantsOfKind(SyntaxKind.ClassDeclaration);
    return allClasses?.find(c => c.getName() === className);
  }
}
