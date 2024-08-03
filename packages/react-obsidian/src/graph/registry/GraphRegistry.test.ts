import SingletonGraph from '../../../test/fixtures/SingletonGraph';
import MainGraph from '../../../test/fixtures/MainGraph';
import { GraphRegistry } from './GraphRegistry';
import { LifecycleBoundGraph } from '../../../test/fixtures/LifecycleBoundGraph';
import { ScopedLifecycleBoundGraph } from '../../../test/fixtures/ScopedLifecycleBoundGraph';

describe('GraphRegistry', () => {
  let uut: GraphRegistry;

  beforeEach(() => {
    uut = new GraphRegistry();
  });

  it('creates a new graph instance if the graph is not a @Singleton', () => {
    uut.register(MainGraph);
    expect(uut.resolve(MainGraph)).not.toBe(uut.resolve(MainGraph));
  });

  it('creates graphs once if the graph is a @Singleton', () => {
    uut.register(SingletonGraph);
    expect(uut.resolve(SingletonGraph)).toBe(uut.resolve(SingletonGraph));
  });

  it('creates bound graphs once if the graph exists', () => {
    uut.register(LifecycleBoundGraph);
    expect(uut.resolve(LifecycleBoundGraph)).toBe(uut.resolve(LifecycleBoundGraph));
  });

  it('recreates bound graph after it was cleared', () => {
    const first = uut.resolve(LifecycleBoundGraph);
    uut.clear(first);
    const second = uut.resolve(LifecycleBoundGraph);
    expect(second).not.toBe(first);
  });

  it('recreates @Singleton graphs after reset', () => {
    uut.register(SingletonGraph);
    const beforeReset = uut.resolve(SingletonGraph);
    uut.clearAll();
    const afterReset = uut.resolve(SingletonGraph);
    expect(beforeReset).not.toEqual(afterReset);
  });

  it(`clear() doesn't clear @Singleton graphs`, () => {
    uut.register(SingletonGraph);
    const graph = uut.resolve(SingletonGraph);
    uut.clear(graph);
    expect(uut.resolve(SingletonGraph)).toEqual(graph);
  });

  it.each([
    ['clear', (graph: any) => uut.clear(graph)],
    ['clearAll', () => uut.clearAll()],
  ])('should %s scoped lifecycle bound graphs', (_, clearMethod) => {
    uut.register(ScopedLifecycleBoundGraph);

    const graph = uut.resolve(ScopedLifecycleBoundGraph, 'lifecycleOwner', undefined, 'token');
    clearMethod(graph);

    expect(uut.resolve(ScopedLifecycleBoundGraph, 'lifecycleOwner', undefined, 'token')).not.toBe(graph);
  });
});
