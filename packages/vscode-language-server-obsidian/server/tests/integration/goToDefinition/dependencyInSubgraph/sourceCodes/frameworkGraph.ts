import { graph, ObjectGraph, provides, singleton } from 'react-obsidian';
import { Window } from './window';

@singleton() @graph()
export class FrameworkGraph extends ObjectGraph {
  @provides()
  window(): Window {
    return new Window(window);
  }
}
