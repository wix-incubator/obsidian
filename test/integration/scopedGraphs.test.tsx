/* eslint-disable arrow-body-style */
import React from 'react';
import { ReactTestRenderer, act, create } from 'react-test-renderer';
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
  return <>{someString + stringFromSubgraph}</>;
};

describe('Scoped graphs', () => {
  let InjectedComponent: React.FunctionComponent;
  let testRenderer!: ReactTestRenderer;

  beforeEach(() => {
    InjectedComponent = injectComponent(Component, MainGraph);
  });

  it('Dependencies are injected from subgraphs', () => {
    act(() => {
      testRenderer = create(<InjectedComponent />);
    });
    expect(testRenderer.toJSON()).toEqual(`${SOME_STRING}FromSubgraph`);
  });
});
