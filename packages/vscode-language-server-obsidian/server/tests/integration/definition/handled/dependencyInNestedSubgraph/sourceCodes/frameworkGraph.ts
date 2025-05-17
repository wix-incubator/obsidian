import { graph, ObjectGraph, provides, singleton } from 'react-obsidian';
import { Window } from './window';
import { NetworkGraph } from './networkGraph';

@singleton() @graph({ subgraphs: [NetworkGraph] })
export class FrameworkGraph extends ObjectGraph {
  @provides()
  window(): Window {
    return new Window(window);
  }
}
