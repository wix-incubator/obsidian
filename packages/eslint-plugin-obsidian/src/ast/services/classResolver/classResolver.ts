import type { ClassFile } from '../../../dto/classFile';

export interface ClassResolver {
  resolve(clazz: string, from: ClassFile): ClassFile | undefined;
}
