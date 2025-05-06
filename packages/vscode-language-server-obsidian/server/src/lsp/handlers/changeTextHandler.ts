import { DidChangeTextDocumentParams } from "vscode-languageserver";
import { ProjectAdapter } from "../../services/project/projectAdapter";

export class ChangeTextHandler {
  constructor (private readonly project: ProjectAdapter) { }

  public handle(params: DidChangeTextDocumentParams) {
    const sourceFile = this.project.getSourceFileOrThrow(params.textDocument.uri);
    sourceFile.update(params.contentChanges[0].text);
  }
}
