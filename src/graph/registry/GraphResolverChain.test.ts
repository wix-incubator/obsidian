import {
  instance,
  mock,
  when,
  imock,
  anything,
  verify,
} from '@johanblumenberg/ts-mockito';
import MainGraph from '../../../test/integration/fixtures/MainGraph';
import { GraphResolver } from './interfaces';
import GraphResolverMiddleware from './GraphResolverMiddleware';
import GraphResolversChain from './GraphResolversChain';

describe('GraphResolverChain', () => {
  let uut: GraphResolversChain;
  let defaultGraphResolver: GraphResolverMiddleware;
  const mockGraph = mock(MainGraph);

  beforeEach(() => {
    defaultGraphResolver = mock(GraphResolverMiddleware);
    uut = new GraphResolversChain(instance(defaultGraphResolver));
  });

  it('Resolves default', () => {
    const props = { a: 'b' };
    when(defaultGraphResolver.resolve(MainGraph, props)).thenReturn(mockGraph);

    const graph = uut.resolve(MainGraph, props);
    expect(graph).toEqual(mockGraph);
  });

  it('Resolves middlewares in LIFO order', () => {
    const anotherResolver: GraphResolver = imock();
    when(anotherResolver.resolve(anything(), anything(), anything())).thenReturn(mockGraph);

    uut.add(instance(anotherResolver));
    const result = uut.resolve(MainGraph);
    expect(result).toEqual(mockGraph);
    verify(defaultGraphResolver.resolve(anything(), anything())).never();
  });
});
