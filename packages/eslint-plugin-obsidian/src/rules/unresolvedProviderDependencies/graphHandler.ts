import type { Clazz } from '../../dto/class';
import type { Context } from '../../dto/context';
import { reportErrorIfDependencyIsUnresolved } from './errorReporter';
import { ClassAdapter } from '../../ts/adapters/classAdapter';
import { Parameter } from 'ts-morph-extensions/src/dto/parameter';
import { Provider } from 'ts-morph-extensions';

export class GraphHandler {
  constructor(private context: Context, private classAdapter: ClassAdapter) { }

  public handle(clazz: Clazz) {
    if (this.hasGraphDecorator(clazz)) {
      const graph = this.classAdapter.classToGraph(clazz.node, this.context.currentFilePath)!;
      const ownProviders = graph.getProviders();
      const resolvedProviders = graph.resolveProviders();
      const unresolvedDependency = ownProviders
        ?.map(provider => ({provider, deps: provider.dependencies}))
        .map(({provider, deps}) => {
          const unresolvedDep = deps.find(dep => {
            return !resolvedProviders?.some(resolvedProvider => resolvedProvider.name === dep.name);
          });
          return {provider, unresolvedDep};
        })
        .find(pair => !!pair.unresolvedDep);

        reportErrorIfDependencyIsUnresolved(
        this.context,
        this.checkUnresolvedDependencies(clazz, unresolvedDependency),
      );
    }
  }

  private hasGraphDecorator(clazz: Clazz) {
    return clazz.isDecoratedWithIgnoreCase('Graph');
  }

  private checkUnresolvedDependencies(
    clazz: Clazz,
    unresolvedDependency?: {provider: Provider; unresolvedDep: Parameter | undefined},
  ) {
    if (unresolvedDependency && unresolvedDependency.unresolvedDep) {
      const originalNode =clazz
        .getDecoratedMethods('Provides')
        .find(method => method.name === unresolvedDependency.provider.name)
        ?.parameters
        .find(param => unresolvedDependency.unresolvedDep?.name === param.name);
      return {
        error: true,
        param: unresolvedDependency.unresolvedDep?.name,
        node: originalNode?.node,
      };
    }
    return { error: false };
  }

}
