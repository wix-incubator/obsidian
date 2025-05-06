import { DidOpenTextDocumentParams } from "vscode-languageserver";
import { ProjectAdapter } from "../../services/project/projectAdapter";

export class FileOpenHandler {
  constructor (private readonly project: ProjectAdapter) { }

  public handle(params: DidOpenTextDocumentParams) {
    const sourceFile = this.project.getSourceFileOrThrow(params.textDocument.uri);
    sourceFile.update(params.textDocument.text);
  }
}
