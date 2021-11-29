import React from 'react';
import { render } from '@testing-library/react';
import testKit from '../../src/testKit/TestKit';
import Graph from '../../src/decorators/Graph';
import { Provides } from '../../src';
import InjectedComponent from './fixtures/InjectedComponent';
import MainGraph from './fixtures/MainGraph';
import Subgraph from './fixtures/Subgraph';

describe('Test doubles', () => {
  let Component: React.FunctionComponent;

  beforeEach(() => {
    Component = InjectedComponent;
    testKit.replaceGraph(MainGraph, MockMainGraph);
    testKit.replaceGraph(Subgraph, MockSubgraph);
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
