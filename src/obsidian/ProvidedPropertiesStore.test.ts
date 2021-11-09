import providedPropertiesStore from './ProvidedPropertiesStore';

describe('ProvidedPropertiesStore', () => {
  class TestClass {}

  beforeEach(() => {
    providedPropertiesStore.clear(TestClass);
  });

  it('Gets an empty array if nothing has beed set yet', () => {
    expect(providedPropertiesStore.get(TestClass)).toEqual([]);
  });

  it('Sets properties without duplicates', () => {
    providedPropertiesStore.set(TestClass, 'p1');
    providedPropertiesStore.set(TestClass, 'p1');
    providedPropertiesStore.set(TestClass, 'p2');
    expect(providedPropertiesStore.get(TestClass)).toEqual(['p1', 'p2']);
  });
});
