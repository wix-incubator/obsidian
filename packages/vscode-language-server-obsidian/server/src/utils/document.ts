import ts = require("typescript");
import { TextDocument } from "vscode-languageserver-textdocument";

export function createSourceFile(document: TextDocument): ts.SourceFile {
  return ts.createSourceFile(document.uri, document.getText(), ts.ScriptTarget.Latest, true);
}
