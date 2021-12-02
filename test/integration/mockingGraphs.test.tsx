import React from 'react';
import { render } from '@testing-library/react';
import { Constructable } from '@Obsidian';
import { GraphMiddleware, ResolveChain } from '../../src/graph/registry/GraphMiddleware';
import MainGraph from './fixtures/MainGraph';
import Subgraph from './fixtures/Subgraph';
import { Graph, Obsidian, Provides } from '../../src';
import InjectedComponent from './fixtures/InjectedComponent';
import ObjectGraph from '../../src/graph/Graph';

describe('Test doubles', () => {
  let Component: React.FunctionComponent;
  const graphMiddleware = new class extends GraphMiddleware {
    resolve<T extends ObjectGraph, Props>(resolveChain: ResolveChain, Graph: Constructable<T>, props?: Props) {
      switch (Graph.name) {
        case MainGraph.name:
          return new MockMainGraph(props) as unknown as T;
        case Subgraph.name:
          return new MockSubgraph(props) as unknown as T;
        default:
          return resolveChain.proceed(Graph, props);
      }
    }
  }();

  beforeAll(() => {
    Obsidian.addGraphMiddleware(graphMiddleware);
  });

  beforeEach(() => {
    Component = InjectedComponent;
  });

  afterAll(() => {
    Obsidian.clearGraphMiddlewares();
  });

  it('Supports replacing graphs with test doubles', () => {
    const { container } = render(<Component />);
    expect(container.textContent).toBe('MockedContent');
  });

  @Graph()
  class MockMainGraph extends MainGraph {
    @Provides()
    override someString(): string {
      return 'Mocked';
    }
  }

  @Graph()
  class MockSubgraph extends Subgraph {
    @Provides()
    override stringFromSubgraph(): string {
      return 'Content';
    }
  }
});
