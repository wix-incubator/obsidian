import { graph, ObjectGraph, provides } from 'react-obsidian';
import { useEntryViewModel } from './entryViewModel';
import { GameModel } from './gameModel';

@graph()
export class EntryGraph extends ObjectGraph {

  @provides()
  useViewModel(model: GameModel) {
    return () => useEntryViewModel(model);
  }
}
