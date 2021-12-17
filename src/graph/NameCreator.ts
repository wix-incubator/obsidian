import { uniqueId } from 'lodash';

export default class NameCreator {
  constructor(private clazz: any) {}

  public create(): string {
    return uniqueId(this.clazz.constructor.name);
  }
}
