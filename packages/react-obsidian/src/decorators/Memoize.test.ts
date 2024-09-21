import { memoize } from './Memoize';

class Uut {
  private propertyCount = 1;
  private countA = 1;
  private countB = 1;

  get property(): string {
    return `property${this.propertyCount++}`;
  }

  @memoize
  get memoizedPropertyA(): string {
    return `propertyA${this.countA++}`;
  }

  @memoize
  get memoizedPropertyB(): string {
    return `propertyB${this.countB++}`;
  }
}

describe('Memoized', () => {
  let uut: Uut;

  beforeEach(() => {
    uut = new Uut();
  });

  it('memoizes getter property', () => {
    expect(uut.memoizedPropertyA).toEqual(uut.memoizedPropertyA);
  });

  it('supports multiple @Memoize getters per class', () => {
    expect(uut.memoizedPropertyA).toBe('propertyA1');
    expect(uut.memoizedPropertyB).toBe('propertyB1');
  });

  it(`doesn't affect other getters`, () => {
    expect(uut.property).toBe('property1');
    expect(uut.property).toBe('property2');
  });
});
