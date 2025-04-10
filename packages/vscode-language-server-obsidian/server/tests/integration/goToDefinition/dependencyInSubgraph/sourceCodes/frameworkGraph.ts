import { SourceCode } from "../../..";

export const frameworkGraph: SourceCode = {
  path: '../../framework/di/FrameworkGraph.ts',
  content: `import { graph, ObjectGraph, provides, singleton } from 'react-obsidian';
import { Window } from '../Window';
import { type Document } from '../Document';
import { LocalStorage } from '../../persistency/localStorage';

@singleton() @graph()
export class FrameworkGraph extends ObjectGraph {
  @provides()
  window(): Window {
    return new Window(window);
  }

  @provides()
  document(): Document {
    return document;
  }

  @provides()
  localStorage(): LocalStorage {
    return new LocalStorage();
  }
}`}