import React from 'react';
import { render } from '@testing-library/react';
import MainGraph from './fixtures/MainGraph';
import Subgraph from './fixtures/Subgraph';
import { Graph, Provides } from '../../src';
import InjectedComponent from './fixtures/InjectedComponent';
import { testKit } from '../../testkit';

describe('Test doubles', () => {
  let Component: React.FunctionComponent;

  beforeEach(() => {
    Component = InjectedComponent;

    testKit.mockGraphs({
      MainGraph: MockMainGraph,
      Subgraph: MockSubgraph,
    });
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
