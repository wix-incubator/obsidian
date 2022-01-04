import SingletonGraph from '../../../test/integration/fixtures/SingletonGraph';
import MainGraph from '../../../test/integration/fixtures/MainGraph';
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
});
