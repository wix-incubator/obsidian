import { uniqueId } from '../utils/uniqueId';
import { bindProviders } from './ProviderBinder';
import { Graph } from './Graph';
import PropertyRetriever from './PropertyRetriever';
import { Constructable } from '../types';
import { CircularDependenciesDetector } from './CircularDependenciesDetector';

export abstract class ObjectGraph<T = unknown> implements Graph {
  private propertyRetriever = new PropertyRetriever(this);

  get name(): string {
    if (Reflect.hasMetadata('memoizedName', this)) {
      return Reflect.getMetadata('memoizedName', this);
    }
    const name = uniqueId(this.constructor.name);
    Reflect.defineMetadata('memoizedName', name, this);
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

  onBind(_target: any) {

  }
}

Reflect.set(ObjectGraph, 'typeDiscriminator', 'ObjectGraph');

export function isGraph(object: Constructable<ObjectGraph> | any): object is Constructable<ObjectGraph> {
  return Reflect.get(object, 'typeDiscriminator') === 'ObjectGraph';
}
