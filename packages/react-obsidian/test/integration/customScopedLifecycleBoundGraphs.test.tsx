import React from 'react';
import { render } from '@testing-library/react';
import {
  Graph,
  injectComponent,
  LifecycleBound,
  ObjectGraph,
  Singleton,
} from '../../src';
import graphRegistry from '../../src/graph/registry/GraphRegistry';

describe('custom scoped lifecycle-bound graphs', () => {
  it('instantiates custom scoped graphs eagerly', () => {
    render(<ComponentTheDoesNotInvokeProviders idx={1} />);
    expect(graphRegistry.isInstantiated(CustomScopeGraph)).toBe(true);
  });

  it('instantiates the custom scoped graphs once', () => {
    render(<ComponentTheDoesNotInvokeProviders idx={1} />);
    render(<ComponentTheDoesNotInvokeProviders idx={2} />);
    expect(CustomScopeGraph.idx).toBe(1);
  });

  it('clears the custom scoped subgraph when the main graph is cleared', () => {
    const { unmount } = render(<ComponentTheDoesNotInvokeProviders idx={1} />);
    unmount();
    expect(graphRegistry.isInstantiated(CustomScopeGraph)).toBe(false);
  });

  it('clears the custom scoped subgraph only when no other graphs are using it', () => {
    const result1 = render(<ComponentTheDoesNotInvokeProviders idx={1} />);
    const result2 = render(<ComponentTheDoesNotInvokeProviders2 />);

    result1.unmount();
    expect(graphRegistry.isInstantiated(CustomScopeGraph)).toBe(true);
    result2.unmount();
    expect(graphRegistry.isInstantiated(CustomScopeGraph)).toBe(false);
  });

  it('throws when trying to use a scoped subgraph from an unscoped graph', () => {
    expect(() => {
      render(<ComponentThatWronglyReliesOnCustomScopedGraph />);
    }).toThrow(/Cannot instantiate the scoped graph 'CustomScopeGraph' as a subgraph of 'UnscopedGraph' because the scopes do not match. undefined !== customScope/);
  });

  it('eagerly instantiates nested scoped graphs', () => {
    render(<ComponentThatReliesOnNestedCustomScopedGraph />);
    expect(graphRegistry.isInstantiated(CustomScopeGraph)).toBe(true);
  });
});

@LifecycleBound({ scope: 'customScope' }) @Graph()
class CustomScopeGraph extends ObjectGraph {
  public static idx: number;

  constructor(props: Own) {
    super();
    CustomScopeGraph.idx = props.idx;
  }
}

@LifecycleBound({ scope: 'customScope' }) @Graph({ subgraphs: [CustomScopeGraph] })
class ComponentGraph extends ObjectGraph {
}

@LifecycleBound({ scope: 'customScope' }) @Graph({ subgraphs: [CustomScopeGraph] })
class ComponentGraph2 extends ObjectGraph {
}

type Own = { idx: number };
const ComponentTheDoesNotInvokeProviders = injectComponent<Own>(
  ({ idx }: Own) => <>Hello {idx}</>,
  ComponentGraph,
);

const ComponentTheDoesNotInvokeProviders2 = injectComponent(
  () => <>Hello</>,
  ComponentGraph2,
);

@Graph({ subgraphs: [CustomScopeGraph] })
class UnscopedGraph extends ObjectGraph {
}

const ComponentThatWronglyReliesOnCustomScopedGraph = injectComponent(
  () => <>This should error</>,
  UnscopedGraph,
);

@Singleton() @Graph({ subgraphs: [CustomScopeGraph] })
class SingletonGraphWithCustomScopeSubgraph extends ObjectGraph {
}

@LifecycleBound({ scope: 'customScope' }) @Graph({ subgraphs: [SingletonGraphWithCustomScopeSubgraph] })
class CustomScopedGraphWithNestedCustomScopeSubgraph extends ObjectGraph {
}

const ComponentThatReliesOnNestedCustomScopedGraph = injectComponent(
  () => <>Hello</>,
  CustomScopedGraphWithNestedCustomScopeSubgraph,
);
