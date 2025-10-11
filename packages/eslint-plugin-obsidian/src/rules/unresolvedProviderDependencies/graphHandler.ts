import type { Clazz } from '../../dto/class';
import type { Context } from '../../dto/context';
import { ClassAdapter } from '../../ts/adapters/classAdapter';
import { Parameter, Provider } from 'ts-morph-extensions';
import { TSESTree } from '@typescript-eslint/types';

export class GraphHandler {
  constructor(private context: Context, private classAdapter: ClassAdapter) { }

  public handle(clazz: Clazz) {
    if (this.isGraph(clazz)) {
      const unresolvedDependency = this.findUnresolvedDependency(clazz);
      const unresolvedDependencyError = this.checkUnresolvedDependencies(clazz, unresolvedDependency);
      this.reportError(this.context,unresolvedDependencyError);
    }
  }

  private isGraph(clazz: Clazz) {
    return clazz.isDecoratedWithIgnoreCase('Graph');
  }

  private findUnresolvedDependency(clazz: Clazz) {
    const graph = this.classAdapter.classToGraph(clazz.node, this.context.currentFilePath)!;
    const providers = graph.resolveProviders();
    for (const provider of graph.getProviders()) {
      const unresolvedDep = provider.dependencies.find(dep => dep.isNotProvided(providers));
      if (unresolvedDep) return { provider, unresolvedDep };
    }
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

  private reportError(
    context: Context,
    {error, param, node}: {error: boolean; param?: string; node?: TSESTree.Node},
  ) {
    if (error && node) {
      context.reportError(node, 'unresolved-provider-dependencies', {dependencyName: param});
    }
  }

}
