import { Model, Observable, mockModel } from '../../src';

class State extends Model {
  public session = new Observable<string>();

  get isLoggedIn(): boolean {
    return !!this.session.value;
  }
}

describe('mockModel', () => {
  it('mocks a model', () => {
    const mock: State = mockModel({
      session: new Observable('mocked'),
    });
    expect(mock.session.value).toBeString();
  });

  it('mocks a model with a base class', () => {
    const mock: State = mockModel({
      session: new Observable('mocked'),
    }, State);
    expect(mock.isLoggedIn).toBeTruthy();
  });
});
