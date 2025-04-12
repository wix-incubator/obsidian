export const entryPointContent = `import { type DependenciesOf, injectComponent } from 'react-obsidian';
import { EntryGraph } from './di/EntryGraph';
import type { GameGraph } from '../../core/di/GameGraph';

export type Props = {
  index: number
};

type Foo = DependenciesOf<[EntryGraph, GameGraph], 'useViewModel' | 'foo' | 'model'>;

const Entry_ = ({ useViewModel, model }: Props & Foo) => {
  const { text, onClick } = useViewModel();

  return (
    <li>
      <button onClick={onClick}>{text}</button>
    </li>
  );
};

export const Entry = injectComponent<Props, Foo>(Entry_, EntryGraph);
export const createEntry = (_: unknown, index: number) => <Entry index={index} />;
`;