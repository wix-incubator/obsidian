import Subgraph from '../../../test/integration/fixtures/Subgraph';
import { Obsidian } from '../../index';

describe('Provides', () => {
  it('creates annotated dependency only once', () => {
    const graph = Obsidian.obtain(Subgraph);
    expect(graph.instanceId()).toEqual(graph.instanceId());
  });

  it('creates dependency once per graph instance', () => {
    const id1 = new Subgraph().instanceId();
    const id2 = new Subgraph().instanceId();
    expect(id1).not.toEqual(id2);
  });
});
