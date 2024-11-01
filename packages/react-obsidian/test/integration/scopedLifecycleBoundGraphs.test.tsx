import React from 'react';
import { render } from '@testing-library/react';
import {
  graph,
  injectComponent,
  lifecycleBound,
  ObjectGraph,
  provides,
  type DependenciesOf,
} from '../../src';

let instanceCounter = 0;

describe('Scoped lifecycle bound graphs', () => {
  beforeEach(() => {
    instanceCounter = 0;
  });

  it('reuses the same graph instance when injecting child components', () => {
    const resultA = render(<ComponentA count={1} />);
    const resultB = render(<ComponentA count={2} />);

    expect(resultA.container.textContent).toBe('count: 1 id: id1');
    expect(resultB.container.textContent).toBe('count: 2 id: id2');
  });

  it('reuses the same graph instance when rendering conditional components', () => {
    render(<ComponentA count={1} />);
    const resultA = render(<ComponentA count={2} />);
    render(<ComponentA count={3} />);

    resultA.rerender(<ComponentA count={2} renderComponentC />);
    expect(resultA.container.textContent).toEqual('count: 2 id: id2 from C: count: 2 id: id2');
  });
});

@lifecycleBound({ scope: 'component' }) @graph()
class ScopedLifecycleBoundGraph extends ObjectGraph {
  private instanceId: string;

  constructor(private props: Props) {
    super(props);
    this.instanceId = `id${++instanceCounter}`;
  }

  @provides()
  count() {
    return this.props.count;
  }

  @provides()
  id() {
    return this.instanceId;
  }
}

type Props = {
  count: number;
  renderComponentC?: boolean;
};

const ComponentA = injectComponent<Props>(({ renderComponentC }: Props) => {
  return (
    <>
      <ComponentB />
      {renderComponentC && <ComponentC />}
    </>
  );
}, ScopedLifecycleBoundGraph);

type Injected = DependenciesOf<ScopedLifecycleBoundGraph, 'count' | 'id'>;
type Own = { injectionToken: string };

const ComponentB = injectComponent(({ count, id }: Injected & Own) => {
  return <>{`count: ${count} id: ${id}`}</>;
}, ScopedLifecycleBoundGraph);

const ComponentC = injectComponent(({ count, id }: Injected & Own) => {
  return <>{` from C: count: ${count} id: ${id}`}</>;
}, ScopedLifecycleBoundGraph);
