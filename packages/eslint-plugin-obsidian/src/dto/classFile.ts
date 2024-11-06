import type { Clazz } from './class';
import type { Import } from './import';

export class ClassFile {
  constructor(
    public readonly clazz: Clazz,
    public readonly imports: Import[],
    public readonly path: string,
  ) {}

  get superClass() {
    return this.clazz.superClass;
  }
}
