import { DependenciesOf, injectComponent } from 'react-obsidian';
import { DependencyGraph } from './DependencyGraph';
import { Greeter } from './Greeter';

const greeter = new Greeter();

type Injected = DependenciesOf<DependencyGraph, 'hello'>;

const _Example = ({ hello }: Injected) => {
  return (
    <div>
      <h1>{greeter.greet()}</h1>
      {hello || `uh oh, it didn't work`}
    </div>
  );
};

export const Example = injectComponent(_Example, DependencyGraph,);
