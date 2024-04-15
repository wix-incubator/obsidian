import { Constructable } from '../src/types';
import { Model } from '../src/model/Model';

export function mockModel<T extends Model, S extends Partial<T>>(mock: S, BaseClass?: Constructable<T>): T {
  if (BaseClass) {
    const bc = new BaseClass();
    Object.assign(bc, mock);
    return bc;
  }

  return new class extends Model {
    constructor() {
      super();
      Object.assign(this, mock);
    }
  }() as T;
}
