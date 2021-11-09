/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
import React from 'react';
import { create } from 'react-test-renderer';
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
    const mockLink = 'https://link-to-a-mock-page';

    class PageProvider {
      get page(): string {
        return mockLink;
      }
    }

    interface LinkProps {
      pageProvider: PageProvider;
    }

    @Graph()
    class LinkGraph extends ObjectGraph<LinkProps> {
      @Provides()
      get pageProvider(): PageProvider {
        return new PageProvider();
      }
    }

    function Link({ pageProvider }: LinkProps) {
      return <a href={pageProvider.page}>Click Me</a>;
    }

    const Wrapped = injectComponent(Link, LinkGraph);
    const testInstance = create(<Wrapped />).root;
    const { pageProvider } = testInstance.findByType(Link).props;
    expect(pageProvider.page).toEqual(mockLink);
  });
});
