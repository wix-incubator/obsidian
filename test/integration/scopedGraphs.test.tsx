/* eslint-disable arrow-body-style */
import { render } from '@testing-library/react';
import React from 'react';
import { injectComponent } from '../../src';
import MainGraph from './fixtures/MainGraph';
import { SOME_STRING } from './fixtures/StringProvider';

interface InjectedComponentProps {
  someString: string;
  stringFromSubgraph: string;
}

const Component: React.FunctionComponent<InjectedComponentProps> = ({
  someString,
  stringFromSubgraph,
}: InjectedComponentProps) => {
  return <div data-testid="container">{someString + stringFromSubgraph}</div>;
};

describe('Scoped graphs', () => {
  it('Dependencies are injected from subgraphs', async () => {
    const InjectedComponent = injectComponent(Component, MainGraph);
    const { getByTestId } = render(<InjectedComponent />);
    const container = await getByTestId('container');
    expect(container.textContent).toBe(`${SOME_STRING}FromSubgraph`);
  });
});
