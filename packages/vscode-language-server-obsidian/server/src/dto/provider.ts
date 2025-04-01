import ts = require("typescript");

export class Provider {
  constructor(private node: ts.MethodDeclaration) { }

  public get text() {
    return this.node.getText();
  }

  public getRange(sourceFile: ts.SourceFile) {
    return {
      start: sourceFile.getLineAndCharacterOfPosition(this.node.getStart()),
      end: sourceFile.getLineAndCharacterOfPosition(this.node.getEnd())
    };
  }
}
