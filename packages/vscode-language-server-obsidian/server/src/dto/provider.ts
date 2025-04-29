import { MethodDeclaration, Node, SyntaxKind } from "ts-morph";
import { Identifier } from "./identifier";

export class Provider {
  constructor (private node: MethodDeclaration) { }

  public getText() {
    return this.node.getText();
  }

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

  public resolveReturnType() {
    const returnStatement = this.node.getStatements().find(Node.isReturnStatement);
    const expression = returnStatement?.getFirstChildByKind(SyntaxKind.NewExpression);
    const identifier = expression?.getFirstChildByKind(SyntaxKind.Identifier);
    return identifier && new Identifier(identifier);
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
