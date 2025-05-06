import { graph, ObjectGraph, provides } from 'react-obsidian';
import { EntryViewModel, useEntryViewModel } from './entryViewModel';
import { GameModel } from './gameModel';

@graph()
export class EntryGraph extends ObjectGraph {

  @provides()
  useViewModel(model: GameModel): EntryViewModel {
    return () => useEntryViewModel(model);
  }
}
