import ObjectGraph from './ObjectGraph';

describe('ObjectGraph', () => {
  let uut: ObjectGraph;

  beforeEach(() => {
    uut = new class SomeGraph extends ObjectGraph {}();
  });

  it('Graph name is created once', () => {
    expect(uut.name).toEqual(uut.name);
  });

  it('Creates unique names when graphs have the same name', () => {
    const graphA = new class SomeGraph extends ObjectGraph {}();
    const graphB = new class SomeGraph extends ObjectGraph {}();
    expect(graphA.name).not.toBe(graphB.name);
  });
});
