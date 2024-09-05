import type { Clazz } from '../../dto/class';
import type { Parameter } from '../../dto/parameter';

type DependencyCheckResult = { error: boolean; param?: string; node?: any };

export class ResolvedDependencyChecker {
  public check(clazz: Clazz, dependencies: string[]): DependencyCheckResult {
    const unresolvedDependency = clazz
      .getDecoratedMethods('Provides')
      .flatMap(method => method.parameters)
      .find(provider => !dependencies.includes(provider.name));
    return this.getResult(unresolvedDependency);
  }

  private getResult(unresolvedDependency: Parameter | undefined): DependencyCheckResult {
    if (unresolvedDependency) {
      return { error: true, param: unresolvedDependency.name, node: unresolvedDependency.node };
    }
    return { error: false };
  }
}
