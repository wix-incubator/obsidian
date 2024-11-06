import { CircularDependencyGraph2 } from '../../test/fixtures/CircularDependencyGraph2';
import { UniqueNumberGraph } from '../../test/fixtures/UniqueNumberGraph';
import PropertyRetriever from './PropertyRetriever';

describe('PropertyRetriever', () => {
  let count = 0;
  const uniqueNumbersGenerator = () => ++count;
  let uut: () => PropertyRetriever;

  beforeEach(() => {
    count = 0;
    uut = () => new PropertyRetriever(new UniqueNumberGraph(uniqueNumbersGenerator));
  });

  it('retrieves a property from a graph', () => {
    expect(uut().retrieve('instanceNumber')).toBe(1);
  });

  it('memoizes providers per graph instance', () => {
    const uut1 = uut();
    expect(uut1.retrieve('instanceNumber')).toBe(1);
    expect(uut1.retrieve('instanceNumber')).toBe(1);

    const uut2 = uut();
    expect(uut2.retrieve('instanceNumber')).toBe(2);
    expect(uut2.retrieve('instanceNumber')).toBe(2);
  });

  it.skip('invokes a singleton provider once', () => {
    expect(uut().retrieve('singletonNumber')).toBe(1);
    expect(uut().retrieve('singletonNumber')).toBe(1);
  });

  it('throws on circular dependencies', () => {
    const uut1 = new PropertyRetriever(new CircularDependencyGraph2());
    expect(() => uut1.retrieve('dep1')).toThrow(
      /Could not resolve dep1 from CircularDependencyGraph2\d because of a circular dependency: dep1 -> dep2 -> dep3 -> dep1/,
    );
  });
});
