import type { Clazz } from '../../dto/class';
import type { Context } from '../../dto/context';
import { reportErrorIfDependencyIsUnresolved } from './errorReporter';
import type { DependencyResolver } from './dependencyResolver';
import type { Import } from '../../dto/import';
import { ResolvedDependencyChecker } from './resolvedDependencyChecker';

export class GraphHandler {
  constructor(
    private context: Context,
    private dependencyResolver: DependencyResolver,
    private resolvedDependencyChecker: ResolvedDependencyChecker = new ResolvedDependencyChecker(),
  ) { }

  public handle(clazz: Clazz, imports: Import[]) {
    if (this.hasGraphDecorator(clazz)) {
      const dependencies = this.dependencyResolver.resolve(this.context, clazz, imports);
      const resolvedDependenciesCheck = this.resolvedDependencyChecker.check(clazz, dependencies);
      reportErrorIfDependencyIsUnresolved(this.context, resolvedDependenciesCheck);
    }
  }

  private hasGraphDecorator(clazz: Clazz) {
    return clazz.isDecoratedWithIgnoreCase('Graph');
  }
}
