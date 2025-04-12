import { ImportDeclaration } from "ts-morph";

export class Import {
  constructor (private declaration: ImportDeclaration) { }

  public getText() {
    return this.declaration.getText();
  }

  public get sourceFile() {
    return this.declaration.getSourceFile();
  }

  public get path() {
    return this.declaration.getModuleSpecifier().getText().replace(/^['"]/, '').replace(/['"]$/, '');
  }

  public includesNamedImport(name: string) {
    return this.declaration.getNamedImports().some(imp => imp.getName() === name);
  }
}
