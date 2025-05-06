import { DependenciesOf, Graph, ObjectGraph, Provides } from 'react-obsidian';
import { useEntryViewModel } from './entryViewModel';
import { GameGraph } from './gameGraph';
import { type Props } from './entryPoint';
import { GameModel } from './gameModel';

type Graphs = [EntryGraph, GameGraph];
export type EntryGraphDependencies<Deps extends keyof DependenciesOf<Graphs>> = DependenciesOf<Graphs, Deps>;

@Graph({ subgraphs: [GameGraph] })
export class EntryGraph extends ObjectGraph {
  private index: number;

  constructor (props: Props) {
    super(props);
    this.index = props.index;
  }

  @Provides()
  useViewModel(model: GameModel) {
    return () => useEntryViewModel(model);
  }
}
