import { instance, mock } from '@johanblumenberg/ts-mockito';
import { Inject } from '../..';
import injectedValues from '../../../test/integration/fixtures/injectedValues';
import MainGraph from '../../../test/integration/fixtures/MainGraph';
import { GraphRegistry } from '../../graph/registry/GraphRegistry';
import ClassInjector from './ClassInjector';

xdescribe('ClassInjector', () => {
  class Uut {
    @Inject() someString!: string;
  }

  let uut: ClassInjector;
  let graphRegistry: GraphRegistry;

  beforeEach(() => {
    graphRegistry = mock(GraphRegistry);
    uut = new ClassInjector(instance(graphRegistry));
  });

  xit('injects properties', () => {
    const injectorFn = uut.inject(MainGraph);
    const InjectedUut = injectorFn(Uut);
    const injected = new InjectedUut();
    expect(injected.someString).toEqual(injectedValues.fromStringProvider);
  });
});
