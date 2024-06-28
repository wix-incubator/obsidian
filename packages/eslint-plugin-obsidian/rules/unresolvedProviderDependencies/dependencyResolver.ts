import { ClassFile } from '../dto/classFile';
import type { Import } from '../dto/import';
import type { Clazz } from '../dto/class';
import type { SubgraphResolver } from './subgraphResolver';
import type { Context } from '../dto/context';

export class DependencyResolver {
  constructor(private subgraphResolver: SubgraphResolver) { }

  public resolve(context: Context, clazz: Clazz, imports: Import[]) {
    const classWithImports = new ClassFile(clazz, imports, context.currentFilePath);
    return [
      ...this.getGraphDependencies(classWithImports),
      ...this.getDependenciesFromSubgraphs(classWithImports),
    ];
  }

  private getDependenciesFromSubgraphs(clazz: ClassFile): string[] {
    return this.subgraphResolver
      .resolve(clazz)
      .flatMap(this.getGraphDependencies);
  }

  private getGraphDependencies({ clazz }: ClassFile) {
    return clazz
      .getDecoratedMethods('Provides')
      .map((method) => method.name);
  }
}