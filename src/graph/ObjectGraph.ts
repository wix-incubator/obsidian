import { Scope } from '@Obsidian';
import IObjectGraph from './IObjectGraph';
import PropertyRetriever from './PropertyRetriever';

export default abstract class ObjectGraph<T = unknown> implements IObjectGraph {
  // TODO? rename scope to singleInstance
  public scope!: Scope;
  public name!: string;
  private propertyRetriever = new PropertyRetriever(this);

  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
  constructor(protected props?: T) {}

  get<Dependency>(property: string, receiver?: unknown): Dependency | undefined {
    return this.propertyRetriever.retrieve(property, receiver) as Dependency | undefined;
  }
}
