import { type DependenciesOf, injectComponent } from 'react-obsidian';
import { EntryGraph } from './entryGraph';
import type { GameGraph } from './gameGraph';

export type Props = {
  index: number;
};

type Injected = DependenciesOf<[EntryGraph, GameGraph], 'useViewModel' | 'model'>;

const Entry_ = ({ useViewModel, model }: Props & Injected) => {
  const { text, onClick } = useViewModel();

  return null;
};

export const Entry = injectComponent<Props, Injected>(Entry_, EntryGraph);
