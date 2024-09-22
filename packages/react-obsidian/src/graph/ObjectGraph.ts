import { uniqueId } from '../utils/uniqueId';
import { bindProviders } from './ProviderBinder';
import { Graph } from './Graph';
import PropertyRetriever from './PropertyRetriever';
import { Constructable } from '../types';
import { CircularDependenciesDetector } from './CircularDependenciesDetector';

export abstract class ObjectGraph<T = unknown> implements Graph {
  private propertyRetriever = new PropertyRetriever(this);

  constructor(protected _props?: T) {
    bindProviders(this);
  }

  get name(): string {
    const key = `memoizedName`;
    let name: string;
    if (Reflect.hasMetadata(key, this)) {
      name = Reflect.getMetadata(key, this);
    } else {
      name = uniqueId(this.constructor.name);
      Reflect.defineMetadata(key, name, this);
    }
    return name;
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
