import { Project, SourceFile } from "ts-morph";
import { Import } from "../../dto/import";

export class ProjectAdapter {
  constructor (private project: Project = new Project()) { }

  public getSourceFile(uri: string) {
    return this.project.getSourceFile(uri);
  }

  public findImportDeclaration(sourceFile: SourceFile, name: string) {
    return sourceFile.getImportDeclarations()
      .map(imp => new Import(imp))
      .find(imp => imp.includesNamedImport(name));
  }
}
