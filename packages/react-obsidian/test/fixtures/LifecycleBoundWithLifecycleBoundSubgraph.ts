import { Graph, ObjectGraph, Provides } from '../../src';
import { LifecycleBound } from '../../src/decorators/LifecycleBound';
import { LifecycleBoundGraph } from './LifecycleBoundGraph';

export type Props = Record<string, any> & { stringFromProps: string };

@LifecycleBound() @Graph({subgraphs: [LifecycleBoundGraph]})
export class LifecycleBoundGraphWithLifecycleBoundSubgraph extends ObjectGraph {

  @Provides()
  aString(computedFromProps: string): string {
    return `A string that requires props from a lifecycle bound subgraph: ${computedFromProps}`;
  }
}
