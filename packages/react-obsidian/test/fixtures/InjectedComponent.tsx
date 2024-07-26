import React from 'react';
import { injectComponent } from '../../src';
import MainGraph from './MainGraph';

type Injected = {
  someString: string;
  stringFromSubgraph: string;
};

const InjectedComponent = ({ someString, stringFromSubgraph }: Injected) => (
  <>
    {`${someString}${stringFromSubgraph}`}
  </>
);

export default injectComponent(InjectedComponent, MainGraph);
