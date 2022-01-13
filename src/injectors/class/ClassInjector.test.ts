import { instance, mock, when } from '@johanblumenberg/ts-mockito';
import { Inject } from '../../decorators/inject/Inject';
import injectedValues from '../../../test/integration/fixtures/injectedValues';
import MainGraph from '../../../test/integration/fixtures/MainGraph';
import { GraphRegistry } from '../../graph/registry/GraphRegistry';
import ClassInjector from './ClassInjector';
import { ConstructorArgs } from './ConstructorArgs';
import InjectionMetadata from './InjectionMetadata';

fdescribe('ClassInjector', () => {
  class Uut {
    @Inject() someString!: string;

    constructor(@Inject() public anotherString: string) {}
  }

  let uut: ClassInjector;
  let graphRegistry: GraphRegistry;
  let injectionMetadata: InjectionMetadata;

  beforeEach(() => {
    graphRegistry = mock(GraphRegistry);
    const graph = new MainGraph();
    when(graphRegistry.resolve(MainGraph)).thenReturn(graph);

    injectionMetadata = mock(InjectionMetadata);
    when(injectionMetadata.getPropertiesToInject(Uut)).thenReturn(new Set());
    uut = new ClassInjector(instance(graphRegistry), instance(injectionMetadata));
  });

  it('injects constructor argument', () => {
    const injectorFn = uut.inject(MainGraph);
    const InjectedUut = injectorFn(Uut);

    const argsToInject = new ConstructorArgs();
    argsToInject.add('anotherString', 0);
    when(injectionMetadata.getConstructorArgsToInject(Uut)).thenReturn(argsToInject);

    const injected = new InjectedUut();
    expect(injected.anotherString).toEqual(injectedValues.anotherString);
  });

  xit('injects properties', () => {
    const injectorFn = uut.inject(MainGraph);
    const InjectedUut = injectorFn(Uut);
    when(injectionMetadata.getConstructorArgsToInject(Uut)).thenReturn();

    const injected = new InjectedUut();
    expect(injected.someString).toEqual(injectedValues.fromStringProvider);
  });
});
