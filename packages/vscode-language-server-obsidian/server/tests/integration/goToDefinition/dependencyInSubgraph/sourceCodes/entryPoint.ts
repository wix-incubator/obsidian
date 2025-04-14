import { graph, ObjectGraph, provides, singleton } from 'react-obsidian';
import { FrameworkGraph } from './frameworkGraph';
import { type Window } from './window';

@singleton() @graph({ subgraphs: [FrameworkGraph] })
export class ThemeGraph extends ObjectGraph {
  @provides()
  bar(_window: Window) {
    return 'bar';
  }
}
