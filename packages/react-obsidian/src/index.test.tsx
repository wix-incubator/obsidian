import {
  graph,
  injectComponent,
  injectHook,
  injectable,
  inject,
  ObjectGraph,
  Obsidian,
  provides,
  singleton,
  GraphMiddleware,
} from './index';

describe('Sanity', () => {
  it('Exports the API', () => {
    expect(graph).toBeDefined();
    expect(ObjectGraph).toBeDefined();
    expect(singleton).toBeDefined();
    expect(injectHook).toBeDefined();
    expect(injectComponent).toBeDefined();
    expect(provides).toBeDefined();
    expect(injectable).toBeDefined();
    expect(inject).toBeDefined();
    expect(Obsidian.obtain).toBeDefined();
    expect(Obsidian.inject).toBeDefined();
    expect(GraphMiddleware).toBeDefined();
  });
});
