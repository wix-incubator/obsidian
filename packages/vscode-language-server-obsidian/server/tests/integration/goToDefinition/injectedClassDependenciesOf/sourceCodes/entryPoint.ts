import { SourceCode } from "../../..";

export const entryPoint: SourceCode = {
  path: 'entry.tsx',
  content: `import { injectComponent } from 'react-obsidian';
import { EntryGraph, type EntryGraphDependencies } from './di/EntryGraph';

export type Props = {
  index: number;
};

type Injected = EntryGraphDependencies<'useViewModel' | 'foo' | 'model'>;

const Entry_ = ({ useViewModel, model }: Props & Injected) => {
  const { text, onClick } = useViewModel();

  return (
    <li>
      <button onClick={onClick}>{text}</button>
    </li>
  );
};

export const Entry = injectComponent<Props, Injected>(Entry_, EntryGraph);
export const createEntry = (_: unknown, index: number) => <Entry index={index} />;`
};