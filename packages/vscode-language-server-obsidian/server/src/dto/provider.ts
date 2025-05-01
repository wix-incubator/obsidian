import { MethodDeclaration } from "ts-morph";

export class Provider {
  constructor (private node: MethodDeclaration) { }

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
    const range = this.getRange();
    return {
      uri: this.uri,
      range: {
        start: {
          line: range.start.line,
          character: range.start.column - 1
        },
        end: {
          line: range.end.line,
          character: range.end.column
        }
      }
    };
  }
}
