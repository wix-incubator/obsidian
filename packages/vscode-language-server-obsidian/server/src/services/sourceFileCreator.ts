import { TextDocument } from "vscode-languageserver-textdocument";
import ts = require("typescript");

export class SourceFileCreator {
  public create(document: TextDocument): ts.SourceFile {
    return ts.createSourceFile(document.uri, document.getText(), ts.ScriptTarget.Latest, true);
  }
}
