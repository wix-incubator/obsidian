import { DependenciesOf, injectComponent } from 'react-obsidian';
import { DependencyGraph } from './DependencyGraph';

type Injected = DependenciesOf<DependencyGraph, 'hello'>;

const _Example = ({ hello }: Injected) => {
  return (
    <div>
      {hello || `uh oh, it didn't work`}
    </div>
  );
};

export const Example = injectComponent(
  _Example,
  DependencyGraph,
);