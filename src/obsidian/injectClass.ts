import { Constructable } from '@Obsidian';
import graphResolver from './GraphResolver';
import ObjectGraph from './ObjectGraph';

const injectionMetadataKey = 'injectionMetadata';

export function Injectable<T extends {new(...args: any[]): any}>(Graph: Constructable<ObjectGraph>): any {
  return (Target: T) => {
    const proxy = {
      construct(target: any, args: any[], newTarget: any): new() => {} {
        const keysToInject: string[] = Reflect.getMetadata(injectionMetadataKey, target) ?? [];

        const createdObject = Reflect.construct(target, args, newTarget);
        const graph = graphResolver.resolve(Graph);
        for (const key of keysToInject) {
          Reflect.set(createdObject, key, graph.get(key));
        }
        return createdObject;
      },
    };
    return new Proxy(Target, proxy);
  };
}

export function Inject(target: Object, propertyKey: string) {
  const keysToInject = Reflect.getMetadata(injectionMetadataKey, target.constructor) ?? new Set();
  Reflect.defineMetadata(injectionMetadataKey, keysToInject.add(propertyKey), target.constructor);
}
