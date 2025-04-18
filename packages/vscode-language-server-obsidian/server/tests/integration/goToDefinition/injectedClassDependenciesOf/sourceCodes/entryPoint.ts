import { injectComponent } from 'react-obsidian';
import { EntryGraph, type EntryGraphDependencies } from './entryGraph';

export type Props = {
  index: number;
};

type Injected = EntryGraphDependencies<'useViewModel' | 'foo' | 'model'>;

const Entry_ = ({ useViewModel, model }: Props & Injected) => {
  const { text, onClick } = useViewModel();

  return null;
};

export const Entry = injectComponent<Props, Injected>(Entry_, EntryGraph);