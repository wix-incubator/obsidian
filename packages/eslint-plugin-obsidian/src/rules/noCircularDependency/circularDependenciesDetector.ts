import type { TSESTree } from '@typescript-eslint/types';
import type { Clazz } from '../../dto/class';
import type { Method } from '../../dto/method';

type DetectionResult =
  { hasCircularDependency: true; path: string[]; node: TSESTree.Node } |
  { hasCircularDependency: false; path?: never; node?: never };

export class CircularDependenciesDetector {
  detect(clazz: Clazz): DetectionResult {
    const providers = clazz.getDecoratedMethods('Provides');
    const visited = new Set<string>();
    for (const provider of providers) {
      const result = this.isCircular(
        provider,
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
    provider: Method,
    providers: Method[],
    path: Set<string>,
  ): DetectionResult {
    if (path.has(provider.name)) {
      return {
        hasCircularDependency: true,
        path: [...path, provider.name],
        node: provider.node,
      };
    }

    const newPath = new Set(path);
    newPath.add(provider.name);

    for (const dep of provider.parameters) {
      const depProvider = providers.find(p => p.name === dep.name);
      if (depProvider) {
        const result = this.isCircular(depProvider, providers, newPath);
        if (result.hasCircularDependency) return result;
      }
    }

    return { hasCircularDependency: false };
  }
}
