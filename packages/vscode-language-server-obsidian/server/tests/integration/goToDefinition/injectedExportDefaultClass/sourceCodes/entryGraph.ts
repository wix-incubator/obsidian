import { graph, ObjectGraph, provides } from 'react-obsidian';
import { useEntryViewModel } from './entryViewModel';
import { GameGraph } from './gameGraph';
import { type Props } from './entryPoint';
import type GameModel from './gameModel';

@graph({ subgraphs: [GameGraph] })
export class EntryGraph extends ObjectGraph {
  private index: number;

  constructor (props: Props) {
    super(props);
    this.index = props.index;
  }

  @provides()
  useViewModel(model: GameModel) {
    return () => useEntryViewModel(model);
  }

  @provides()
  foo() {
    return 'foo';
  }
}