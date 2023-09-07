import { Model } from '../src/model/Model';

export function mockModel<T extends Model, S extends Partial<T>>(mock: S): T {
  return new class extends Model {
    constructor() {
      super();
      Object.assign(this, mock);
    }
  }() as T;
}
