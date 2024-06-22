import type { TSESTree } from '@typescript-eslint/types';
import type { ClassDeclaration } from '../dto/classDeclaration';
import type { PathResolver } from '../framework/pathResolver';
import type { Context } from './types';
import {
  checkDependencies,
  getDependenciesFromSubgraphs,
  getPropertyDeclarations,
  getSubGraphs,
  mapFunctions,
} from './ASTFunctions';
import { reportErrorIfDependencyIsUnresolved } from './errorReporter';

export class GraphHandler {
  constructor(
    private context: Context,
    private pathResolver: PathResolver,
    private imports: TSESTree.ImportDeclaration[],
  ) { }

  public handle(clazz: ClassDeclaration) {
    if (this.hasGraphDecorator(clazz)) {
      const dependencies = this.resolveDependencies(clazz);
      reportErrorIfDependencyIsUnresolved(this.context, checkDependencies(clazz, dependencies));
    }
  }

  private hasGraphDecorator(clazz: ClassDeclaration) {
    return clazz.decoratorNames.includes('Graph');
  }

  private resolveDependencies(clazz: ClassDeclaration) {
    const subGraphs = getSubGraphs(clazz);
    return [
      ...getDependenciesFromSubgraphs(this.imports, subGraphs, this.context, this.pathResolver),
      ...mapFunctions(clazz),
      ...getPropertyDeclarations(clazz),
    ];
  }
}