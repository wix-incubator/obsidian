import React from 'react';
import { render } from '@testing-library/react';
import SingletonGraph from '../fixtures/SingletonGraph';
import MainGraph from '../fixtures/MainGraph';
import Subgraph from '../fixtures/Subgraph';
import {
  Graph,
  Obsidian,
  Provides,
  Singleton,
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

  it('Mocks graphs when using Obsidian.obtain on a Singleton graph'
  + 'even after the singleton graph was already registered in graph registry', () => {
    registerSingletonGraphBeforeMocking();

    const stringToCompare = Obsidian.obtain(SingletonGraph).instanceId();
    expect(stringToCompare).toBe('MockSingleton');
  });

  function registerSingletonGraphBeforeMocking() {
    Obsidian.obtain(SingletonGraph);
    mockGraphs({ SingletonGraph: MockSingletonGraph });
  }

  @Singleton() @Graph()
  class MockSingletonGraph extends SingletonGraph {
    @Provides()
    override instanceId(): string {
      return 'MockSingleton';
    }
  }

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
