import { type DependenciesOf, injectComponent } from 'react-obsidian';
import { EntryGraph } from './entryGraph';

export type Props = {
  index: number;
};

type Injected = DependenciesOf<[EntryGraph], 'useViewModel'>;

const Entry_ = ({ useViewModel }: Props & Injected) => {
  const { text, onClick } = useViewModel();

  return null;
};

export const Entry = injectComponent<Props, Injected>(Entry_, EntryGraph);
