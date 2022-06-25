import {
  instance,
  mock,
  when,
  imock,
  anything,
  verify,
} from '@johanblumenberg/ts-mockito';
import MainGraph from '../../../test/fixtures/MainGraph';
import { Middleware } from './Middleware';
import GraphResolversChain from './GraphMiddlewareChain';
import { ObjectGraph } from '../ObjectGraph';
import { GraphMiddleware } from './GraphMiddleware';

describe('GraphResolverChain', () => {
  let uut: GraphResolversChain<ObjectGraph>;
  let defaultGraphResolver: GraphMiddleware;
  const mockGraph = mock(MainGraph);

  beforeEach(() => {
    defaultGraphResolver = mock(GraphMiddleware);
    uut = new GraphResolversChain(instance(defaultGraphResolver));
  });

  it('Resolves default', () => {
    const props = { a: 'b' };
    when(defaultGraphResolver.resolve(anything(), MainGraph, props)).thenReturn(mockGraph);

    const graph = uut.resolve(MainGraph, props);
    expect(graph).toEqual(mockGraph);
  });

  it('Resolves middlewares in LIFO order', () => {
    const anotherResolver: Middleware<ObjectGraph> = imock();
    when(anotherResolver.resolve(anything(), anything(), anything())).thenReturn(mockGraph);

    uut.add(instance(anotherResolver));
    const result = uut.resolve(MainGraph);
    expect(result).toEqual(mockGraph);
    verify(defaultGraphResolver.resolve(anything(), anything())).never();
  });
});
