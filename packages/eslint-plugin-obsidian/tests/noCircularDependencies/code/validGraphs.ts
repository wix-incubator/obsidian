export const validGraph = `import { uniqueId } from 'lodash';
import { Graph, ObjectGraph, Provides } from 'src';

@Graph()
export default class SimpleGraph extends ObjectGraph {
  @Provides()
  foo(): string {
    return 'foo';
  }

  @Provides()
  bar(baz: any): string {
    return 'foo';
  }

  @Provides()
  baz(qux: any): string {
    return 'baz';
  }
}`;
