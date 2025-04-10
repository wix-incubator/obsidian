import { Project, SourceFile } from "ts-morph";
import { TextDocument } from "vscode-languageserver-textdocument";
import { TextDocumentPositionParams, TextDocuments } from "vscode-languageserver/node";
import { Import } from "../../dto/import";
import * as path from 'path';
import { resolveFileExtension } from "../../utils/file";

export class ProjectAdapter {

  constructor(
    private documents: TextDocuments<TextDocument>,
    private project: Project = new Project()
  ) { }

  public getSourceFiles() {
    return this.project.getSourceFiles();
  }

  public addSourceFile(params: TextDocumentPositionParams) {
    const document = this.documents.get(params.textDocument.uri);
    if (!document) throw new Error(`Document not found for URI: ${params.textDocument.uri}`);
    return this.project.addSourceFileAtPath(document.uri.replace(/^file:\/\//, ''));
  }

  addSourceFileFromImport(declaration: Import | undefined) {
    if (!declaration) return;
    const filePath = resolveFileExtension(declaration.path);
    const currentFileDir = path.dirname(declaration.sourceFile.getFilePath());
    const absolutePath = path.resolve(currentFileDir, filePath);
    console.log(`Adding source file from import: ${absolutePath}`);
    return this.project.addSourceFileAtPath(absolutePath);
  }

  public findImportDeclaration(sourceFile: SourceFile, name: string) {
    return sourceFile.getImportDeclarations()
      .map(imp => new Import(imp))
      .find(imp => imp.includesNamedImport(name));
  }
}

