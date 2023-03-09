import { Graph, ObjectGraph, Provides } from '../../src';

export class MissingDependencyClass {
  constructor(private theString: string) { }
  get(): string {
    return this.theString;
  }
}

@Graph()
export class MissingDependencyGraph extends ObjectGraph {
  @Provides()
  missingDependencyObject(aString: string) {
    return new MissingDependencyClass(aString);
  }
}
