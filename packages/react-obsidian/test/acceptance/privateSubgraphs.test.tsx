import React from 'react';
import { render } from '@testing-library/react';
import { injectComponent, Obsidian } from '../../src';
import MainGraph from '../fixtures/MainGraph';
import SingletonGraph from '../fixtures/SingletonGraph';
import { HttpClient } from '../fixtures/privateSubgraph';

describe('Private Subgraphs', () => {
  afterEach(() => {
    Obsidian.clearGraphs();
  });

  it('allows parent graph provider methods to use dependencies from private subgraphs', () => {
    const fetcher = Obsidian.obtain(MainGraph).fetcher();
    const result = fetcher.fetch('/test');
    expect(result.response.status).toBe(200);
  });

  it('does not expose private subgraph dependencies via service locator', () => {
    const mainGraph = Obsidian.obtain(MainGraph);

    // @ts-expect-error - httpClient should not be accessible
    const httpClient = mainGraph.httpClient();

    expect(httpClient).toBeUndefined();
  });

  it('does not expose private subgraph dependencies via service locator (config)', () => {
    const serviceLocator = Obsidian.obtain(MainGraph);

    // @ts-expect-error - config should not be accessible
    const config = serviceLocator.config();

    expect(config).toBeUndefined();
  });

  it('exposes parent graph dependencies via service locator', () => {
    const someString = Obsidian.obtain(MainGraph).someString();

    expect(someString).toBeDefined();
    expect(typeof someString).toBe('string');
  });

  it('graphs without privateSubgraphs parameter work as before', () => {
    const instanceId = Obsidian.obtain(SingletonGraph).instanceId();

    expect(instanceId).toBeDefined();
    expect(typeof instanceId).toBe('string');
  });

  it('private dependencies are undefined when injecting React components', () => {
    interface Props {
      httpClient: HttpClient;
      someString: string;
    }

    const TestComponent = ({ httpClient, someString }: Props) => (
      <div>
        <span data-testid="httpClient">{httpClient ? 'defined' : 'undefined'}</span>
        <span data-testid="someString">{someString}</span>
      </div>
    );

    const InjectedComponent = injectComponent(TestComponent, MainGraph);

    const { getByTestId } = render(<InjectedComponent />);

    expect(getByTestId('httpClient').textContent).toBe('undefined');
    expect(getByTestId('someString').textContent).toBe('Fear kills progress');
  });
});

