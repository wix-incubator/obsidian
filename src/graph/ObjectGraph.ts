import { uniqueId } from 'lodash';
import Memoize from '../decorators/Memoize';
import { Scope } from '../types';
import { autobind } from '../utils/autobind';
import { Graph } from './Graph';
import PropertyRetriever from './PropertyRetriever';

export abstract class ObjectGraph<T = unknown> implements Graph {
  // TODO? rename scope to singleInstance
  public scope!: Scope;
  private propertyRetriever = new PropertyRetriever(this);

  @Memoize()
  get name(): string {
    return uniqueId(this.constructor.name);
  }

  constructor(protected _props?: T) {
    autobind(this);
  }

  retrieve<Dependency>(property: string, receiver?: unknown): Dependency | undefined {
    return this.propertyRetriever.retrieve(property, receiver) as Dependency | undefined;
  }
}
