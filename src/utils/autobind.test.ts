import _ from 'lodash';
import { autobind } from './autobind';

class Uut {
  member = 'classMember';

  func(): string | undefined {
    return this?.member;
  }

  get getter(): string {
    return this.member;
  }
}

describe('autobind', () => {
  let uut: Uut;

  beforeEach(() => {
    uut = new Uut();
  });

  it('binds functions', () => {
    const unbound = uut.func;
    expect(unbound()).toBeUndefined();

    autobind(uut);
    const bound = uut.func;
    expect(bound()).toBe('classMember');
  });

  it('does not break getters', () => {
    const { getter } = uut;
    expect(getter).toBe('classMember');
  });
});
