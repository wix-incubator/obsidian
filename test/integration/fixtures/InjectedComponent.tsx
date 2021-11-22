import React from 'react';
import { injectComponent } from '../../../src';
import MainGraph from './MainGraph';

interface InjectedComponentProps {
  someString: string;
  stringFromSubgraph: string;
}

const InjectedComponent = ({ someString, stringFromSubgraph }: InjectedComponentProps) => (
  <>
    {`${someString}${stringFromSubgraph}`}
  </>
);

export default injectComponent(
  InjectedComponent,
  MainGraph,
);
