import {
  ObjectGraph,
  graph,
  provides,
  inject,
  injectable,
} from '..';

@graph()
class GraphA extends ObjectGraph {
  fromGraphA = 'from GraphA';

  @provides()
  firstDep(): string {
    return `only ${this.fromGraphA}`;
  }

  @provides()
  secondDep(): string {
    return this.fromGraphA;
  }
}

@graph()
class GraphB extends GraphA {
  private fromGraphB = 'from GraphB';

  @provides()
  override secondDep(): string {
    return `overriding ${this.fromGraphB}`;
  }

  @provides()
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
    @injectable(GraphB)
    class Uut {
      @inject() firstDep!: string;
      @inject() secondDep!: string;
      @inject() thirdDep!: string;
    }

    const uut = new Uut();
    expect(uut.firstDep).toBe('only from GraphA');
    expect(uut.secondDep).toBe('overriding from GraphB');
    expect(uut.thirdDep).toBe('from GraphB');
  });
});
