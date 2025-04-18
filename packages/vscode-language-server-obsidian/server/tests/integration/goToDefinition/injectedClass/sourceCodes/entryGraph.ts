import { graph, ObjectGraph, provides } from 'react-obsidian';
import { type Props } from './entryPoint';
import { type GameModel } from './gameModel';
import { GameGraph } from './gameGraph';
import { useEntryViewModel } from './entryViewModel';

@graph({ subgraphs: [GameGraph] })
export class EntryGraph extends ObjectGraph {
  private index: number;

  constructor (props: Props) {
    super(props);
    this.index = props.index;
  }

  @provides()
  useViewModel(model: GameModel) {
    return () => useEntryViewModel(this.index, model);
  }
} 
