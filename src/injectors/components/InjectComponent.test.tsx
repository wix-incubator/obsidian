import { render } from '@testing-library/react';
import React from 'react';
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
});
