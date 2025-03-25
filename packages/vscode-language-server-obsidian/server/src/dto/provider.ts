import ts = require("typescript");
import { TextDocument } from "vscode-languageserver-textdocument";

export class Provider {
  constructor(private node: ts.MethodDeclaration) { }

  public get text() {
    return this.node.getText();
  }

  public getRange(document: TextDocument) {
    const sourceFile = ts.createSourceFile(document.uri, document.getText(), ts.ScriptTarget.Latest, true);
    return {
      start: sourceFile.getLineAndCharacterOfPosition(this.node.getStart()),
      end: sourceFile.getLineAndCharacterOfPosition(this.node.getEnd())
    };
  }
}
