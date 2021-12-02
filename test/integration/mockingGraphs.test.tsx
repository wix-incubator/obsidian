import React from 'react';
import { render } from '@testing-library/react';
import { GraphResolver, ResolveChain } from 'src/graph/registry/interfaces';
import { Constructable } from '@Obsidian';
import MainGraph from './fixtures/MainGraph';
import Subgraph from './fixtures/Subgraph';
import { Graph, Obsidian, Provides } from '../../src';
import InjectedComponent from './fixtures/InjectedComponent';
import ObjectGraph from '../../src/graph/Graph';

describe('Test doubles', () => {
  let Component: React.FunctionComponent;
  const mockGraphCreator: GraphResolver = {
    resolve: <T extends ObjectGraph, Props>(
      resolveChain: ResolveChain,
      Graph: Constructable<T>,
      props?: Props): T => {
      switch (Graph.name) {
        case MainGraph.name:
          return new MockMainGraph(props) as unknown as T;
        case Subgraph.name:
          return new MockSubgraph(props) as unknown as T;
        default:
          return resolveChain.proceed(Graph, props);
      }
    },
  };

  beforeEach(() => {
    Component = InjectedComponent;
    Obsidian.addGraphResolver(mockGraphCreator);
  });

  afterAll(() => {
    Obsidian.clearGraphResolvers();
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
