import { Project, SourceFile } from "ts-morph";
import { TextDocument } from "vscode-languageserver-textdocument";
import { TextDocumentPositionParams, TextDocuments } from "vscode-languageserver/node";

export class ProjectAdapter {
  private project: Project = new Project();

  constructor(private documents: TextDocuments<TextDocument>) { }

  public addSourceFile(params: TextDocumentPositionParams) {
    const document = this.documents.get(params.textDocument.uri);
    if (!document) throw new Error(`Document not found for URI: ${params.textDocument.uri}`);
    return this.project.addSourceFileAtPath(document.uri.replace(/^file:\/\//, ''));
  }

  public findImportDeclaration(sourceFile: SourceFile, name: string) {
    return sourceFile.getImportDeclarations().find(imp =>
      imp.getNamedImports().some(named => named.getName() === name)
    );
  }
}

