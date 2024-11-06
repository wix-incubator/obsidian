import { uniqueId } from '../utils/uniqueId';
import { bindProviders } from './ProviderBinder';
import { Graph } from './Graph';
import PropertyRetriever from './PropertyRetriever';
import { Constructable } from '../types';
import { CircularDependenciesDetector } from './CircularDependenciesDetector';

export abstract class ObjectGraph<T = unknown> implements Graph {
  private propertyRetriever = new PropertyRetriever(this);
  public readonly name: string;

  constructor(protected _props?: T) {
    bindProviders(this);
    this.name = uniqueId(this.constructor.name);
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
