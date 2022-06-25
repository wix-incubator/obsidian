/* eslint-disable arrow-body-style */
import { render } from '@testing-library/react';
import React from 'react';
import { injectComponent } from '../../src';
import injectedValues from '../fixtures/injectedValues';
import MainGraph from '../fixtures/MainGraph';
import ThrowingMainGraph from '../fixtures/ThrowingMainGraph';

interface InjectedComponentProps {
  someString: string;
  stringFromSubgraph: string;
}

const Component: React.FunctionComponent<InjectedComponentProps> = ({
  someString,
  stringFromSubgraph,
}: InjectedComponentProps) => {
  return <>{someString + stringFromSubgraph}</>;
};

describe('Property resolving precedence', () => {
  let InjectedComponent: React.FunctionComponent<Partial<InjectedComponentProps>>;

  beforeEach(() => {
    InjectedComponent = injectComponent(Component, MainGraph);
  });

  it('Injects dependencies from subgraphs', async () => {
    const { container } = render(<InjectedComponent />);
    expect(container.textContent).toBe(`${injectedValues.fromStringProvider}${injectedValues.fromSubgraph}`);
  });

  it('Prioritizes dependencies passed as props', () => {
    const { container } = render(<InjectedComponent someString="only" stringFromSubgraph="Tests" />);
    expect(container.textContent).toBe('onlyTests');
  });

  it('Only injects dependencies from graph and its subgraphs', () => {
    const Uut = injectComponent(InjectedComponent, ThrowingMainGraph);
    const { container } = render(<Uut />);
    expect(container.textContent).toBe(`${injectedValues.fromStringProvider}${injectedValues.fromSubgraph}`);
  });
});
