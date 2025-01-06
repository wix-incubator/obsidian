import type { ClassFile } from '../../dto/classFile';
import type { FileReader } from '../../framework/fileReader';

export class ClassResolver {
  constructor(private fileReader: FileReader) { }

  public resolve(clazz: string, from: ClassFile) {
    const classPath = from.imports.find($import => $import.includes(clazz));
    return classPath && this.fileReader.read(from.path, classPath.path).findClass(clazz);
  }
}
