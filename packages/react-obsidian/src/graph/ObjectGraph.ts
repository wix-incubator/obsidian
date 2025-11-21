import { uniqueId } from '../utils/uniqueId';
import { bindProviders } from './ProviderBinder';
import { Graph } from './Graph';
import PropertyRetriever from './PropertyRetriever';
import { Constructable } from '../types';
import { CircularDependenciesDetector } from './CircularDependenciesDetector';
import { Reflect } from '../utils/reflect';
import { getConstructorOrParentConstructor } from '../utils/object';

export abstract class ObjectGraph<T = unknown> implements Graph {
  private propertyRetriever = new PropertyRetriever(this);

  get name(): string {
    const target = getConstructorOrParentConstructor(this.constructor, ObjectGraph.name);
    if (Reflect.hasMetadata('memoizedName', target)) {
      return Reflect.getMetadata('memoizedName', target);
    }
    const name = uniqueId(target.name);
    Reflect.defineMetadata('memoizedName', name, target);
    return name;
  }

  constructor(protected _props?: T) {
    bindProviders(this);
  }

  retrieve<Dependency>(
    property: string,
    receiver?: unknown,
    detector?: CircularDependenciesDetector,
    includePrivate: boolean = false,
  ): Dependency | undefined {
    return this.propertyRetriever.retrieve(
      property,
      receiver,
      detector,
      includePrivate,
    ) as Dependency | undefined;
  }

  onBind(_target: any) {

  }
}

Reflect.set(ObjectGraph, 'typeDiscriminator', 'ObjectGraph');

export function isGraph(object: Constructable<ObjectGraph> | any): object is Constructable<ObjectGraph> {
  return Reflect.get(object, 'typeDiscriminator') === 'ObjectGraph';
}
