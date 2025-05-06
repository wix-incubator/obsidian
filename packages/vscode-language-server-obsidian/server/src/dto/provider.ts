import { MethodDeclaration } from "ts-morph";

export class Provider {
  constructor (private node: MethodDeclaration) { }

  public get name() {
    return this.node.getName().replace(/^_/, '');
  }

  public get type() {
    const returnType = this.node.getReturnType();
    if (returnType.getCallSignatures().length > 0) return returnType.getText();
    const symbol = returnType.getSymbol();
    return symbol ? symbol.getName() : returnType.getText();
  }

  public get kind(): "class" | "function" | (string & {}) {
    if (this.node.getReturnType().isClassOrInterface()) return "class";
    if (this.node.getReturnType().getCallSignatures().length > 0) return "function";
    return this.node.getReturnType().getText();
  }

  public get uri() {
    return this.sourceFile.getFilePath();
  }

  private get sourceFile() {
    return this.node.getSourceFile();
  }

  public get definition() {
    const range = this.range;
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

  private get range() {
    return {
      start: this.sourceFile.getLineAndColumnAtPos(this.node.getStart()),
      end: this.sourceFile.getLineAndColumnAtPos(this.node.getEnd())
    };
  }

  public hasParameter(name: string) {
    return this.node.getParameters().some(param => param.getName() === name);
  }
}
