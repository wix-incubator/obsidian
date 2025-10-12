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
      const unresolvedDep = provider.dependencies.find(dep => dep.isNotProvided(providers));
      if (unresolvedDep) return { provider, unresolvedDep };
    }
  }

  private reportError(
    context: Context,
    clazz: Clazz,
    unresolvedDependency?: {provider: Provider; unresolvedDep: Parameter},
  ) {
    if (unresolvedDependency) {
      const param = unresolvedDependency.unresolvedDep?.name;
      const node = this.getTSESTreeNode(clazz, unresolvedDependency.provider, unresolvedDependency.unresolvedDep);
      context.reportError(node, 'unresolved-provider-dependencies', {dependencyName: param});
    }
  }

  private getTSESTreeNode(clazz: Clazz, provider: Provider, unresolvedDependency: Parameter) {
    return clazz
      .requireMethod(provider.name)
      .requireParameter(unresolvedDependency.name)
      .node;
  }
}
