import type { Clazz } from '../../dto/class';
import type { Context } from '../../dto/context';
import { ClassAdapter } from '../../ts/adapters/classAdapter';
import { Parameter, Provider } from 'ts-morph-extensions';

export class GraphHandler {
  constructor(private context: Context, private classAdapter: ClassAdapter) { }

  public handle(clazz: Clazz) {
    if (clazz.isGraph) {
      const unresolvedDependency = this.findUnresolvedDependency(clazz);
      this.reportError(this.context, clazz, unresolvedDependency);
    }
  }

  private findUnresolvedDependency(clazz: Clazz) {
    const graph = this.classAdapter.classToGraph(clazz.node, this.context.currentFilePath)!;
    const providers = graph.resolveProviders();
    for (const provider of graph.getProviders()) {
      const unresolvedDep = provider.dependencies.find(dep => (
        dep.isNotProvided(providers) && !provider.isDependencyPrefixedWithUnderscore(dep)
      ));
      if (unresolvedDep) return { provider, unresolvedDep };
    }
  }

  private reportError(
    context: Context,
    clazz: Clazz,
    providerToUnresolvedDependency?: {provider: Provider; unresolvedDep: Parameter},
  ) {
    if (providerToUnresolvedDependency) {
      const { provider, unresolvedDep } = providerToUnresolvedDependency;
      const parameter = clazz.requireMethodParameter(provider.name, unresolvedDep.name);
      context.reportError(parameter.node, 'unresolved-provider-dependencies', {dependencyName: unresolvedDep.name});
    }
  }
}
