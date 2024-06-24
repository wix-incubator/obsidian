import type { Clazz } from './class';
import type { Import } from './import';

export class ClassWithImports {

  constructor(
    public readonly clazz: Clazz,
    public readonly imports: Import[],
  ) {}

  public getClassPathFromImports(className: string) {
    return this.imports.find(($import) => {
      return $import.includes(className);
    })?.path;
  }
}