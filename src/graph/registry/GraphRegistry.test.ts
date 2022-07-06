import SingletonGraph from '../../../test/fixtures/SingletonGraph';
import MainGraph from '../../../test/fixtures/MainGraph';
import { GraphRegistry } from './GraphRegistry';

describe('GraphRegistry', () => {
  let uut: GraphRegistry;

  beforeEach(() => {
    uut = new GraphRegistry();
  });

  it('creates a new graph instance if the graph is not a @Singleton', () => {
    uut.register(MainGraph);
    expect(uut.resolve(MainGraph)).not.toEqual(uut.resolve(MainGraph));
  });

  it('creates graphs once if the graph is a @Singleton', () => {
    uut.register(SingletonGraph);
    expect(uut.resolve(SingletonGraph)).toEqual(uut.resolve(SingletonGraph));
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
});
