export const validGraph = `import { uniqueId } from 'lodash';
import { graph, ObjectGraph, provides } from 'src';

@graph()
export default class SimpleGraph extends ObjectGraph {
  @provides()
  foo(): string {
    return 'foo';
  }

  @provides()
  bar(baz: any): string {
    return 'foo';
  }

  @provides()
  baz(qux: any): string {
    return 'baz';
  }
}`;
