import React from 'react';
import { render } from '@testing-library/react';
import { GraphCreator } from 'src/graph/registry/GraphCreator';
import { Constructable } from '@Obsidian';
import { Graph, Obsidian, Provides } from '../../src';
import InjectedComponent from './fixtures/InjectedComponent';
import MainGraph from './fixtures/MainGraph';
import Subgraph from './fixtures/Subgraph';
import ObjectGraph from '../../src/graph/Graph';

describe('Test doubles', () => {
  let Component: React.FunctionComponent;
  const mockGraphCreator: GraphCreator = {
    create: <T extends ObjectGraph, Props>(Graph: Constructable<T>, props?: Props): T => {
      switch (Graph.name) {
        case MainGraph.name:
          return new MockMainGraph(props) as unknown as T;
        case Subgraph.name:
          return new MockSubgraph(props) as unknown as T;
        default:
          return new Graph(props);
      }
    },
  };

  beforeEach(() => {
    Component = InjectedComponent;
    Obsidian.setGraphCreator(mockGraphCreator);
  });

  afterAll(() => {
    Obsidian.clearGraphCreator();
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
