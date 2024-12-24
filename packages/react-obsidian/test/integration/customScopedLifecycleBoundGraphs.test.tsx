import React from 'react';
import { render } from '@testing-library/react';
import {
  Graph,
  injectComponent,
  LifecycleBound,
  ObjectGraph,
} from '../../src';
import graphRegistry  from '../../src/graph/registry/GraphRegistry';

describe('custom scoped lifecycle-bound graphs', () => {
  it('instantiates custom scoped graphs eagerly', () => {
    render(<ComponentTheDoesNotInvokeProviders idx={1} />);
    expect(graphRegistry.isRegistered(CustomScopeGraph)).toBe(true);
  });

  it('instantiates the custom scoped graphs once', () => {
    render(<ComponentTheDoesNotInvokeProviders idx={1} />);
    render(<ComponentTheDoesNotInvokeProviders idx={2} />);
    expect(CustomScopeGraph.idx).toBe(1);
  });

  it('clears the custom scoped subgraph when the main graph is cleared', async () => {
    const {unmount} = render(<ComponentTheDoesNotInvokeProviders idx={1} />);
    unmount();
    expect(graphRegistry.isRegistered(CustomScopeGraph)).toBe(false);
  });

  it('clears the custom scoped subgraph only when no other graphs are using it', async () => {
    const result1 = render(<ComponentTheDoesNotInvokeProviders idx={1} />);
    const result2 = render(<ComponentTheDoesNotInvokeProviders2 />);

    result1.unmount();
    expect(graphRegistry.isRegistered(CustomScopeGraph)).toBe(true);
    result2.unmount();
    expect(graphRegistry.isRegistered(CustomScopeGraph)).toBe(false);
  });
});

@LifecycleBound({scope: 'customScope'}) @Graph()
class CustomScopeGraph extends ObjectGraph {
  public static idx: number;

  constructor(props: Own) {
    super();
    CustomScopeGraph.idx = props.idx;
  }
}

@LifecycleBound({scope: 'customScope'}) @Graph({subgraphs: [CustomScopeGraph]})
class ComponentGraph extends ObjectGraph {
}

@LifecycleBound({scope: 'customScope'}) @Graph({subgraphs: [CustomScopeGraph]})
class ComponentGraph2 extends ObjectGraph {
}

type Own = {idx: number};
const ComponentTheDoesNotInvokeProviders = injectComponent<Own>(
  ({idx}: Own) => <>Hello {idx}</>,
  ComponentGraph,
);

const ComponentTheDoesNotInvokeProviders2 = injectComponent(
  () => <>Hello</>,
  ComponentGraph2,
);