import type { Clazz } from './class';
import type { Import } from './import';

export class ClassWithImports {

  constructor(
    public readonly clazz: Clazz,
    public readonly imports: Import[],
  ) {}
}
