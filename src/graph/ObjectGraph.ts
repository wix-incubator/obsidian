import { Scope } from '@Obsidian';
import Graph from './Graph';
import PropertyRetriever from './PropertyRetriever';

export default abstract class ObjectGraph<T = unknown> implements Graph {
  // TODO? rename scope to singleInstance
  public scope!: Scope;
  private propertyRetriever = new PropertyRetriever(this);
  get name(): string {
    return this.constructor.name;
  }

  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
  constructor(protected props?: T) {}

  retrieve<Dependency>(property: string, receiver?: unknown): Dependency | undefined {
    return this.propertyRetriever.retrieve(property, receiver) as Dependency | undefined;
  }
}
