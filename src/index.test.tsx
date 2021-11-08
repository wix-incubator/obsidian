/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
import React from 'react';
import {create, act} from 'react-test-renderer';
import {
  Graph, injectComponent, injectHook, ObjectGraph, Obsidian, Provides,
} from './index';

describe('Sanity', () => {
  it('Exports the API', () => {
    expect(Graph).toBeDefined();
    expect(ObjectGraph).toBeDefined();
    expect(injectHook).toBeDefined();
    expect(injectComponent).toBeDefined();
    expect(Provides).toBeDefined();
    expect(Obsidian.obtain).toBeDefined();
  });

  it('Injects to component', () => {
    class PageProvider {
      get page(): string {
        return 'https://link-to-a-mock-page';
      }
    }

    interface LinkProps {
      pageProvider: PageProvider;
    }

    @Graph()
    class LinkGraph extends ObjectGraph<LinkProps> {
      constructor(props: LinkProps) {
        super();
        console.log(`Created LinkGraph with ${props}`);
      }

      @Provides()
      get pageProvider(): PageProvider {
        return new PageProvider();
      }
    }

    function Link({ pageProvider }: LinkProps) {
      return <a href={pageProvider.page}>Click Me</a>;
    }

    const Wrapped = injectComponent(Link, LinkGraph);

    let testRenderer;
    act(() => {
      testRenderer = create(<Wrapped />);
      console.log(testRenderer.toJSON());
    });
  });
});
