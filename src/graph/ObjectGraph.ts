import { uniqueId } from 'lodash';
import Memoize from '../decorators/Memoize';
import { bindProviders } from './ProviderBinder';
import { Graph } from './Graph';
import PropertyRetriever from './PropertyRetriever';

export abstract class ObjectGraph<T = unknown> implements Graph {
  private propertyRetriever = new PropertyRetriever(this);

  @Memoize()
  get name(): string {
    return uniqueId(this.constructor.name);
  }

  constructor(protected _props?: T) {
    bindProviders(this);
  }

  retrieve<Dependency>(property: string, receiver?: unknown): Dependency | undefined {
    return this.propertyRetriever.retrieve(property, receiver) as Dependency | undefined;
  }
}
