import { render } from '@testing-library/react';
import React from 'react';
import MainGraph, { Dependencies } from '../../../test/fixtures/MainGraph';
import { injectComponent } from './InjectComponent';

describe('ComponentInjector', () => {
  interface OwnProps {
    count: number;
  }

  const component = ({ count, someString }: OwnProps & Dependencies) => {
    return (<>{`${count} - ${someString}`}</>);
  };

  it('Rerenders on props change', () => {
    const InjectedComponent = injectComponent(component, MainGraph);
    const { container, rerender } = render(<InjectedComponent count={0}/>);
    expect(container.textContent).toBe('0 - Fear kills progress');

    rerender(<InjectedComponent count={1}/>);
    expect(container.textContent).toBe('1 - Fear kills progress');
  });
});
