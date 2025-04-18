import { ImportDeclaration } from "ts-morph";
import * as path from 'path';
import { resolveFileExtension } from "../utils/file";
export class Import {
  constructor (private declaration: ImportDeclaration) { }

  public getText() {
    return this.declaration.getText();
  }

  public get sourceFile() {
    return this.declaration.getSourceFile();
  }

  public get path() {
    const relativePath = this.declaration.getModuleSpecifier().getText().replace(/^['"]/, '').replace(/['"]$/, '');
    const withFileExtension = resolveFileExtension(relativePath);
    return path.resolve(path.dirname(this.sourceFile.getFilePath()), withFileExtension);
  }

  public includesNamedImport(name: string) {
    return this.declaration.getNamedImports().some(imp => imp.getName() === name);
  }
}
