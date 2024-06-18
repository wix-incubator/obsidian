import { Graph, ObjectGraph, Provides } from 'react-obsidian';
import GrandchildGraph from './grandchildGraph';

@Graph({subgraphs: [GrandchildGraph]})
export default class ChildGraph extends ObjectGraph {
  @Provides()
  bar(): string {
    return 'bar';
  }
}
