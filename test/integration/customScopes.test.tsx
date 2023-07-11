import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  Graph,
  ObjectGraph,
  Provides,
  injectComponent,
} from '../../src';

describe('Custom scopes', () => {
  it('should use unique graph instances per child based on custom scope', () => {
    render(<Root />);
    expect(screen.getByText('My name is Bob')).toBeDefined();
    expect(screen.getByText('My name is Alice')).toBeDefined();
    expect(screen.getByText('I am a nested child of Bob')).toBeDefined();
    expect(screen.getByText('I am a nested child of Alice')).toBeDefined();
  });
});

const Root = () => {
  return (
    <>
      <Child name={'Bob'}/>
      <Child name={'Alice'}/>
    </>
  );
};

@Graph()
class ChildGraph extends ObjectGraph {
  private readonly childName: string;

  constructor({ name }: { name: string }) {
    super();
    this.childName = name;
  }

  @Provides()
  childText(): string {
    return `My name is ${this.childName}`;
  }

  @Provides()
  nestedChildText(): string {
    return `I am a nested child of ${this.childName}`;
  }
}

type Own = { name: string };
type Injected = { childText: string };

const Child = injectComponent<Own, Injected>(
  ({ childText }: Injected) => {
    return (
      <>
        <div>{childText}</div>
        <NestedChild />
      </>
    );
  },
  ChildGraph,
);

const NestedChild = injectComponent(
  ({ nestedChildText }: { nestedChildText: string }) => <div>{nestedChildText}</div>,
  ChildGraph,
);
