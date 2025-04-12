import { SourceCode } from "../../..";

export const entryGraphContent: SourceCode = {
  path: './di/EntryGraph',
  content: `import { Graph, ObjectGraph, Provides } from 'react-obsidian';
import { useEntryViewModel } from '../model/entryViewModel';
import { GameGraph } from '../../../core/di/GameGraph';
import { type Props } from '../Entry';
import { type GameModel } from '../../../core/model/GameModel';

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

  @Provides()
  foo() {
    return 'foo';
  }
}`}