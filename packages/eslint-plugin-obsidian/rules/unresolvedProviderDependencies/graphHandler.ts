import type { Clazz } from '../dto/class';
import type { Context } from './types';
import { checkDependencies } from './ASTFunctions';
import { reportErrorIfDependencyIsUnresolved } from './errorReporter';
import type { DependencyResolver } from './dependencyResolver';
import type { Import } from '../dto/import';

export class GraphHandler {
  constructor(
    private context: Context,
    private dependencyResolver: DependencyResolver,
  ) { }

  public handle(clazz: Clazz, imports: Import[]) {
    if (this.hasGraphDecorator(clazz)) {
      const dependencies = this.dependencyResolver.resolve(clazz, imports);
      reportErrorIfDependencyIsUnresolved(this.context, checkDependencies(clazz, dependencies));
    }
  }

  private hasGraphDecorator(clazz: Clazz) {
    return clazz.decoratorNames.includes('Graph');
  }
}
