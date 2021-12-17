import Memoize from '../decorators/Memoize';
import { Scope } from '../types';
import Graph from './Graph';
import NameCreator from './NameCreator';
import PropertyRetriever from './PropertyRetriever';

export default abstract class ObjectGraph<T = unknown> implements Graph {
  // TODO? rename scope to singleInstance
  public scope!: Scope;
  private propertyRetriever = new PropertyRetriever(this);

  @Memoize()
  protected get nameCreator(): NameCreator {
    return new NameCreator(this);
  }

  @Memoize()
  get name(): string {
    return this.nameCreator.create();
  }

  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
  constructor(protected props?: T) {}

  retrieve<Dependency>(property: string, receiver?: unknown): Dependency | undefined {
    return this.propertyRetriever.retrieve(property, receiver) as Dependency | undefined;
  }
}
