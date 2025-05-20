import { RuleContext } from '@typescript-eslint/utils/ts-eslint';
import { ClassFile } from '../../../dto/classFile';
import { ClassResolver } from './classResolver';
import { ParserServices } from '@typescript-eslint/parser';
import { Import } from '../../../dto/import';
import { Declaration, TypeChecker } from 'typescript';
import { FileReader } from '../../../framework/fileReader';

export class TsConfigAwareClassResolver implements ClassResolver {
  private parserServices: ParserServices;
  private typeChecker: TypeChecker;

  constructor(context: RuleContext<any, any>, private fileReader: FileReader) {
    this.parserServices = context.sourceCode.parserServices as ParserServices;
    this.typeChecker = this.parserServices.program!!.getTypeChecker();
  }

  public resolve(clazz: string, from: ClassFile): ClassFile | undefined {
    const importNode = from.imports.find(($import) => $import.includes(clazz));
    return this.resolveClassFromImport(clazz, importNode);
  }

  private resolveClassFromImport(clazz: string, importNode: Import | undefined) {
    if (!importNode) return undefined;
    const node = this.parserServices.esTreeNodeToTSNodeMap.get(importNode.node);
    const symbol = this.typeChecker.getSymbolAtLocation(node);
    const declarations = symbol?.getDeclarations();
    return this.resolveClassFromDeclarations(clazz, declarations);
  }

  private resolveClassFromDeclarations(clazz: string, declarations: Declaration[] | undefined) {
    if (!declarations || declarations.length === 0) return undefined;
    const classPath = declarations[0].getSourceFile().fileName;
    return classPath ? this.fileReader.read(classPath, classPath).findClass(clazz) : undefined;
  }
}
