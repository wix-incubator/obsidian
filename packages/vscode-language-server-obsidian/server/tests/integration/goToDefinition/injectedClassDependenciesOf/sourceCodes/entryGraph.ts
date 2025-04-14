import { SourceCode } from "../../..";

export const entryGraphContent: SourceCode = {
  path: './di/EntryGraph',
  content: `import { DependenciesOf, Graph, ObjectGraph, Provides } from 'react-obsidian';
import { useEntryViewModel } from '../model/entryViewModel';
import { GameGraph } from '../../../core/di/GameGraph';
import { type Props } from '../Entry';
import type GameModel from '../../../core/model/GameModel';

type Graphs = [ EntryGraph, GameGraph];
export type EntryGraphDependencies<Deps extends keyof DependenciesOf<Graphs>> = DependenciesOf<Graphs, Deps>;

@Graph({ subgraphs: [GameGraph] })
export class EntryGraph extends ObjectGraph {
  private index: number;

  constructor(props: Props) {
    super(props);
    this.index = props.index;
  }

  @Provides()
  useViewModel(model: GameModel) {
    return () => useEntryViewModel(this.index, model);
  }
}
`};