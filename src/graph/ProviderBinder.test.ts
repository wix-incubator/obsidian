import {
  ObjectGraph,
  Graph,
  Provides,
  Inject,
  Injectable,
} from '..';

@Graph()
class GraphA extends ObjectGraph {
  fromGraphA = 'from GraphA';

  @Provides()
  firstDep(): string {
    return `only ${this.fromGraphA}`;
  }

  @Provides()
  secondDep(): string {
    return this.fromGraphA;
  }
}

@Graph()
class GraphB extends GraphA {
  private fromGraphB = 'from GraphB';

  @Provides()
  override secondDep(): string {
    return `overriding ${this.fromGraphB}`;
  }

  @Provides()
  thirdDep(): string {
    return this.fromGraphB;
  }
}

describe('ProviderBinder', () => {
  it('binds provided methods', () => {
    const { firstDep } = new GraphA();
    expect(firstDep()).toBe('only from GraphA');
  });

  it('binds overriding methods', () => {
    const { secondDep } = new GraphB();
    expect(secondDep()).toBe('overriding from GraphB');
  });

  it('injects classes', () => {
    @Injectable(GraphB)
    class Uut {
      @Inject firstDep!: string;
      @Inject secondDep!: string;
      @Inject thirdDep!: string;
    }

    const uut = new Uut();
    expect(uut.firstDep).toBe('only from GraphA');
    expect(uut.secondDep).toBe('overriding from GraphB');
    expect(uut.thirdDep).toBe('from GraphB');
  });
});
