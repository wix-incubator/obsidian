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
  Graph,
  LifecycleBound,
  Singleton,
  Injectable,
  LateInject,
  Inject,
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
    expect(Graph).toBeDefined();
    expect(LifecycleBound).toBeDefined();
    expect(Singleton).toBeDefined();
    expect(Injectable).toBeDefined();
    expect(LateInject).toBeDefined();
    expect(Inject).toBeDefined();
  });
});
