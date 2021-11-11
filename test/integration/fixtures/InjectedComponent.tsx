import React from 'react';
import { injectComponent } from 'src';
import MainGraph from './MainGraph';

interface InjectedComponentProps {
  someString: string;
}

const injectedComponent = ({ someString }: InjectedComponentProps) => <>{someString}</>;

export default injectComponent(injectedComponent, MainGraph);
