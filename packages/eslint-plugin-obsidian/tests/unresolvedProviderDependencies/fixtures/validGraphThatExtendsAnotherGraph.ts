import { graph, provides } from 'react-obsidian';
import {AbstractGraph} from './abstractGraph';

@graph()
export default class GraphA extends AbstractGraph {
  @provides()
  foo(bar: string): string {
    return 'foo' + bar;
  }
}
