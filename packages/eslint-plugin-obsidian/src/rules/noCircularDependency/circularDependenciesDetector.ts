import type { Clazz } from '../../dto/class';
import type { Method } from '../../dto/method';
import type { Parameter } from '../../dto/parameter';

type DetectionResult =
  { hasCircularDependency: true; path: string[] } |
  { hasCircularDependency: false; path?: never };

export class CircularDependenciesDetector {

  detect(clazz: Clazz): DetectionResult {
    const providers = clazz.getDecoratedMethods('Provides');
    const visited = new Set<string>();
    for (const provider of providers) {
      const result = this.isCircular(
        provider.name,
        provider.parameters,
        providers,
        visited,
      );
      if (result.hasCircularDependency) {
        return result;
      }
    }
    return { hasCircularDependency: false };
  }

  isCircular(
    providerName: string,
    dependencies: Parameter[],
    providers: Method[],
    path: Set<string>,
  ): DetectionResult {
    if (path.has(providerName)) {
      return {
        hasCircularDependency: true,
        path: [...path, providerName],
      };
    }

    const newPath = new Set(path);
    newPath.add(providerName);

    for (const dep of dependencies) {
      const depProvider = providers.find(p => p.name === dep.name);
      if (depProvider) {
        const result = this.isCircular(depProvider.name, depProvider.parameters, providers, newPath);
        if (result.hasCircularDependency) return result;
      }
    }

    return { hasCircularDependency: false };
  }
}