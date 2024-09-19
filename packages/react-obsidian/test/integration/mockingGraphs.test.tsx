import React from 'react';
import { render } from '@testing-library/react';
import SingletonGraph from '../fixtures/SingletonGraph';
import MainGraph from '../fixtures/MainGraph';
import Subgraph from '../fixtures/Subgraph';
import {
  graph,
  Obsidian,
  provides,
  singleton,
} from '../../src';
import InjectedComponent from '../fixtures/InjectedComponent';
import { mockGraphs } from '../../testkit';

describe('Test doubles', () => {
  let Component: React.FunctionComponent;

  beforeEach(() => {
    Component = InjectedComponent;

    mockGraphs({
      MainGraph: MockMainGraph,
      Subgraph: MockSubgraph,
    });
  });

  it('Supports replacing graphs with test doubles', () => {
    const { container } = render(<Component />);
    expect(container.textContent).toBe('MockedContent');
  });

  it('Mocks graphs when using Obsidian.obtain', () => {
    const stringToCompare = Obsidian.obtain(MainGraph).someString();
    expect(stringToCompare).toBe('Mocked');
  });

  it('Mocks graphs when using Obsidian.obtain on a Singleton graph even after the singleton graph was already registered in graph registry', () => {
    registerSingletonGraphBeforeMocking();

    const stringToCompare = Obsidian.obtain(SingletonGraph).instanceId();
    expect(stringToCompare).toBe('MockSingleton');
  });

  function registerSingletonGraphBeforeMocking() {
    Obsidian.obtain(SingletonGraph);
    mockGraphs({ SingletonGraph: MockSingletonGraph });
  }

  @singleton() @graph()
  class MockSingletonGraph extends SingletonGraph {
    @provides()
    override instanceId(): string {
      return 'MockSingleton';
    }
  }

  @graph()
  class MockMainGraph extends MainGraph {
    @provides()
    override someString(): string {
      return 'Mocked';
    }
  }

  @graph()
  class MockSubgraph extends Subgraph {
    @provides()
    override stringFromSubgraph(): string {
      return 'Content';
    }
  }
});
