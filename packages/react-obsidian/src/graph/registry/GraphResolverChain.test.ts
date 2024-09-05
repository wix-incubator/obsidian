import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';
import MainGraph from '../../../test/fixtures/MainGraph';
import { Middleware } from './Middleware';
import GraphResolversChain from './GraphMiddlewareChain';
import { ObjectGraph } from '../ObjectGraph';
import { GraphMiddleware } from './GraphMiddleware';

describe('GraphResolverChain', () => {
  let uut: GraphResolversChain<ObjectGraph>;
  let defaultGraphResolver: GraphMiddleware;
  const mockGraph = mock<MainGraph>();

  beforeEach(() => {
    defaultGraphResolver = mock();
    uut = new GraphResolversChain(defaultGraphResolver);
  });

  it('Resolves default', () => {
    const props = { a: 'b' };
    when(defaultGraphResolver.resolve)
      .expectCalledWith(expect.anything(), MainGraph, props)
      .mockReturnValue(mockGraph);

    const graph = uut.resolve(MainGraph, props);
    expect(graph).toEqual(mockGraph);
  });

  it('Resolves middlewares in LIFO order', () => {
    const anotherResolver = mock<Middleware<ObjectGraph>>();
    when(anotherResolver.resolve).mockReturnValue(mockGraph);

    uut.add(anotherResolver);
    const result = uut.resolve(MainGraph);
    expect(result).toEqual(mockGraph);
    expect(defaultGraphResolver.resolve).not.toHaveBeenCalled();
  });
});
