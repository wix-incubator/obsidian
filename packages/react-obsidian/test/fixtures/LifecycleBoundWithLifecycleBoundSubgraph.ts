import {
  graph,
  ObjectGraph,
  provides,
  lifecycleBound,
} from '../../src';
import { LifecycleBoundGraph } from './LifecycleBoundGraph';

export type Props = Record<string, any> & { stringFromProps: string };

@lifecycleBound() @graph({ subgraphs: [LifecycleBoundGraph] })
export class LifecycleBoundGraphWithLifecycleBoundSubgraph extends ObjectGraph {

  @provides()
  aString(computedFromProps: string): string {
    return `A string that requires props from a lifecycle bound subgraph: ${computedFromProps}`;
  }
}
