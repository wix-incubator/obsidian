import { create } from './createFunction';

describe('createFunction', () => {
  let uut: (context: any) => any;

  beforeEach(() => {
    uut = create;
  });

  it('defines a create function', () => {
    expect(uut).toBeDefined();
  });
});
