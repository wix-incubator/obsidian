import { Scope } from '@Obsidian';
import IObjectGraph from './IObjectGraph';
import PropertyRetriever from './PropertyRetriever';

export default abstract class ObjectGraph<T = unknown> implements IObjectGraph {
  // TODO? rename scope to singleInstance
  public scope!: Scope;
  private propertyRetriever = new PropertyRetriever(this);

  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
  constructor(protected props?: T) {}

  get(property: string, receiver?: unknown): unknown | undefined {
    return this.propertyRetriever.retrieve(property, receiver);
  }
}
