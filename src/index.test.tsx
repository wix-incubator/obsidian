import React from 'react';
import TestRenderer from 'react-test-renderer';
import * as obsidian from './index';

describe('Sanity', () => {
  it('Exports the API', () => {
    expect(obsidian.Graph).toBeDefined();
    expect(obsidian.ObjectGraph).toBeDefined();
    expect(obsidian.injectHook).toBeDefined();
    expect(obsidian.injectComponent).toBeDefined();
    expect(obsidian.Provides).toBeDefined();
    expect(obsidian.Obsidian.obtain).toBeDefined();
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

    @obsidian.Graph()
    class LinkGraph extends obsidian.ObjectGraph<LinkProps> {
      constructor(props: LinkProps) {
        super();
        console.log(`Created LinkGraph with ${props}`);
      }

      @obsidian.Provides()
      get pageProvider(): PageProvider {
        return new PageProvider();
      }
    }

    function Link({ pageProvider }: LinkProps) {
      return <a href={pageProvider.page}>Click Me</a>;
    }

    obsidian.injectComponent(Link, LinkGraph);

    const testRenderer = TestRenderer.create(
      <Link/>
    );
  });
});
