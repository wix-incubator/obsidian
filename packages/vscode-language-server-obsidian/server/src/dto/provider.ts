import { MethodDeclaration } from "ts-morph";

export class Provider {
  constructor(private node: MethodDeclaration) { }

  public get uri() {
    return this.sourceFile.getFilePath();
  }

  private get sourceFile() {
    return this.node.getSourceFile();
  }

  public getRange() {
    return {
      start: this.sourceFile.getLineAndColumnAtPos(this.node.getStart()),
      end: this.sourceFile.getLineAndColumnAtPos(this.node.getEnd())
    };
  }

  public get definition() {
    return {
      uri: this.uri,
      range: {
        start: {
          line: this.getRange().start.line,
          character: this.getRange().start.column - 1
        },
        end: {
          line: this.getRange().end.line,
          character: this.getRange().end.column
        }
      }
    }
  }
}
