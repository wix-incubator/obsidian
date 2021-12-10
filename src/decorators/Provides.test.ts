import Subgraph from '../../test/integration/fixtures/Subgraph';
import { Obsidian } from '../index';

describe('Provides', () => {
  it('creates annotated dependency only once', () => {
    const a = Obsidian.obtain(Subgraph).stringProvider();
    const b = Obsidian.obtain(Subgraph).stringProvider();
    expect(a === b).toBeTruthy();
  });
});
