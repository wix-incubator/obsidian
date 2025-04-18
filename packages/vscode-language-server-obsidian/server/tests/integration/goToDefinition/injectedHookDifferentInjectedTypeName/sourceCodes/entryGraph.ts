import { Graph, ObjectGraph, Provides } from 'react-obsidian';
import { useEntryViewModel } from './entryViewModel';
import { type Props } from './component';

@Graph()
export class EntryGraph extends ObjectGraph {
  private index: number;

  constructor (props: Props) {
    super(props);
    this.index = props.index;
  }

  @Provides()
  useViewModel(model: any) {
    return () => useEntryViewModel(this.index, model);
  }

  @Provides()
  foo() {
    return 'foo';
  }
}
