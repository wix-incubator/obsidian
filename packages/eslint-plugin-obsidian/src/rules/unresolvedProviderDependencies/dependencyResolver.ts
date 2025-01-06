import { ClassFile } from '../../dto/classFile';
import type { Import } from '../../dto/import';
import type { Clazz } from '../../dto/class';
import type { SubgraphResolver } from './subgraphResolver';
import type { Context } from '../../dto/context';
import type { ClassResolver } from './classResolver';

export class DependencyResolver {
  constructor(
    private subgraphResolver: SubgraphResolver,
    private classResolver: ClassResolver,
  ) { }

  public resolve(context: Context, clazz: Clazz, imports: Import[]) {
    const classWithImports = new ClassFile(clazz, imports, context.currentFilePath);
    return [
      ...this.getGraphDependencies(classWithImports),
      ...this.getDependenciesFromSubgraphs(classWithImports),
      ...this.getDependenciesFromSuperClass(classWithImports),
    ];
  }

  private getDependenciesFromSubgraphs(clazz: ClassFile): string[] {
    return this.subgraphResolver
      .resolve(clazz)
      .flatMap($clazz => this.getGraphDependencies($clazz));
  }

  private getGraphDependencies({ clazz }: ClassFile) {
    return clazz.mapDecoratedMethods('Provides', method => method.name) ?? [];
  }

  private getDependenciesFromSuperClass(clazz: ClassFile) {
    if (!clazz.superClass || clazz.superClass === 'ObjectGraph') return [];
    return this.classResolver
      .resolve(clazz.superClass, clazz)
      ?.clazz
      ?.mapDecoratedMethods('Provides', method => method.name) ?? [];
  }
}
