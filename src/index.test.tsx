import {
  Graph,
  injectComponent,
  injectHook,
  Injectable,
  Inject,
  ObjectGraph,
  Obsidian,
  Provides,
  Singleton,
  GraphMiddleware,
} from './index';

describe('Sanity', () => {
  it('Exports the API', () => {
    expect(Graph).toBeDefined();
    expect(ObjectGraph).toBeDefined();
    expect(Singleton).toBeDefined();
    expect(injectHook).toBeDefined();
    expect(injectComponent).toBeDefined();
    expect(Provides).toBeDefined();
    expect(Injectable).toBeDefined();
    expect(Inject).toBeDefined();
    expect(Obsidian.obtain).toBeDefined();
    expect(GraphMiddleware).toBeDefined();
  });
});
