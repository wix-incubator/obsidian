import { graph, ObjectGraph, provides } from 'react-obsidian';

@graph()
class Subgraph extends ObjectGraph {
  @provides()
  subgraphString(): string {
    return 'from subgraph';
  }
}

@graph({ subgraphs: [Subgraph] })
class MainGraph extends ObjectGraph {
  @provides()
  graphString(subgraphString: string): string {
    return 'from main ' + subgraphString;
  }
}
