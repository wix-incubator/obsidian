import { injectable, lateInject, Obsidian } from '../../src';
import injectedValues from '../fixtures/injectedValues';
import lateInjector from '../../src/injectors/class/LateInjector';
import MainGraph from '../fixtures/MainGraph';

describe('Class late injection', () => {
  it('Inject @LateInject property', () => {
    const uut = new LateProperty();
    expect(uut.someString).toBeUndefined();
    lateInjector.inject(uut);
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
  });

  it('Does not inject @LateInject property without calling constructor', () => {
    const uut = Object.create(LatePropertyConstructorInjection.prototype);
    expect(uut.someString).toBeUndefined();
  });

  it('Inject @LateInject property by calling constructor', () => {
    const uut = new LatePropertyConstructorInjection();
    expect(uut.someString).toBe(injectedValues.fromStringProvider);
  });

  it('@LateInject does not change the class name', () => {
    const uut = new LatePropertyConstructorInjection();
    expect(uut.constructor.name).toBe(LatePropertyConstructorInjection.name);
  });

  it('@LateInjects from source graph', () => {
    const obj = new LateProperty();
    const graph = new class extends MainGraph {
      override someString(): string {
        return 'overridden';
      }
    }();
    Obsidian.inject(obj, graph);
    expect(obj.someString).toBe('overridden');
  });
});

@injectable(MainGraph)
class LateProperty {
  @lateInject() someString!: string;
}

@injectable(MainGraph)
class LatePropertyConstructorInjection {
  @lateInject() someString!: string;

  constructor() {
    Obsidian.inject(this);
  }
}
