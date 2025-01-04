import { uniqueId } from '../utils/uniqueId';
import { bindProviders } from './ProviderBinder';
import { Graph } from './Graph';
import PropertyRetriever from './PropertyRetriever';
import { Constructable } from '../types';
import { CircularDependenciesDetector } from './CircularDependenciesDetector';
import { defineMetadata, getMetadata, hasMetadata } from '../utils/reflect';

export abstract class ObjectGraph<T = unknown> implements Graph {
  private propertyRetriever = new PropertyRetriever(this);

  get name(): string {
    if (hasMetadata(this.constructor, 'memoizedName')) {
      return getMetadata(this.constructor, 'memoizedName');
    }
    const name = uniqueId(this.constructor.name);
    defineMetadata(this.constructor, 'memoizedName', name);
    return name;
  }

  constructor(protected _props?: T) {
    bindProviders(this);
  }

  retrieve<Dependency>(
    property: string,
    receiver?: unknown,
    detector?: CircularDependenciesDetector,
  ): Dependency | undefined {
    return this.propertyRetriever.retrieve(property, receiver, detector) as Dependency | undefined;
  }

  onBind(_target: any) { void 0; }
}

Reflect.set(ObjectGraph, 'typeDiscriminator', 'ObjectGraph');

export function isGraph(object: any): object is Constructable<ObjectGraph> {
  return Reflect.get(object, 'typeDiscriminator') === 'ObjectGraph';
}
