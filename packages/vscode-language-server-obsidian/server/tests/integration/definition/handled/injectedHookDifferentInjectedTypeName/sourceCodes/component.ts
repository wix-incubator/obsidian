import { type DependenciesOf, injectComponent } from 'react-obsidian';
import { EntryGraph } from './entryGraph';

export type Props = {
  index: number;
};

type Foo = DependenciesOf<[EntryGraph], 'useViewModel'>;

const Entry_ = ({ useViewModel }: Props & Foo) => {
  const { text, onClick } = useViewModel();

  return null;
};

export const Entry = injectComponent<Props, Foo>(Entry_, EntryGraph);
