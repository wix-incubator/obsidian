import { render } from '@testing-library/react';
import React from 'react';
import type { Constructable, ObjectGraph } from 'src';
import MainGraph, { Dependencies } from '../../../test/fixtures/MainGraph';
import { injectComponent } from './InjectComponent';

describe('injectComponent', () => {
  const component = ({ ownProp, someString }: OwnProps & Dependencies) => {
    return (<>{`${ownProp ?? 'error: own prop not provided'} - ${someString}`}</>);
  };

  interface OwnProps {
    ownProp: string;
  }

  it('Both own and injected props are defined', () => {
    const InjectedComponent = injectComponent<OwnProps, Dependencies>(component, MainGraph);
    const { container } = render(
    <InjectedComponent
      ownProp={'this prop must be provided'}
      someString={'overriding injected string'}/>,
    );
    expect(container.textContent).toBe('this prop must be provided - overriding injected string');
  });

  it('Only own props are defined', () => {
    const InjectedComponent = injectComponent<OwnProps>(component, MainGraph);
    const { container } = render(<InjectedComponent ownProp={'this prop must be provided'} />);
    expect(container.textContent).toBe('this prop must be provided - Fear kills progress');
  });

  it('Props type is inferred', () => {
    const InjectedComponent = injectComponent(component, MainGraph);
    const { container } = render(<InjectedComponent />);
    expect(container.textContent).toBe('error: own prop not provided - Fear kills progress');
  });

  // it throws an error if the Graph is undefined
  it('Throws an error if the Graph is undefined', () => {
    const Graph = undefined as unknown as Constructable<ObjectGraph>;
    expect(() => injectComponent(component, Graph)).toThrowError(
      `injectComponent was called with an undefined Graph.`
      + `This is probably not an issue with Obsidian.`
      + `It's typically caused by circular dependencies.`
      + ` Check the implementation of component.`,
    );
  });
});
