import { MissingDependencyHasSubgraph } from '../../test/fixtures/MissingDependencyHasSubgraph';
import { MissingDependencyGraph } from '../../test/fixtures/MissingDependencyGraph';
import { UniqueNumberGraph } from '../../test/fixtures/UniqueNumberGraph';
import PropertyRetriever from './PropertyRetriever';
import graphRegistry from './registry/GraphRegistry';

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

  it('invokes a singleton provider once', () => {
    expect(uut().retrieve('singletonNumber')).toBe(1);
    expect(uut().retrieve('singletonNumber')).toBe(1);
  });

  it('should throw error if the dependency is undefined', () => {
    const graph = new MissingDependencyGraph();
    const uut1 = new PropertyRetriever(graph);
    const errorMessage = 'Could not resolve dependency aString '
    + 'in MissingDependencyGraph1 or in any of its subgraphs:';
    expect(() => uut1.retrieve('missingDependencyObject')).toThrow(errorMessage);
  });

  // fit('should throw error if the subgraphs dependency is undefined', () => {
  //   const graph = new MissingDependencyHasSubgraph();
  //   graphRegistry.ensureRegistered(graph);
  //   const uut1 = new PropertyRetriever(graph);
  //   const errorMessage = 'Could not resolve dependency missingDependencyObject in'
  //     + ' MissingDependencyHasSubgraph2 or in any of its subgraphs:';
  //   expect(() => uut1.retrieve('missingDependencyObject')).toThrow(errorMessage);
  // });
});
