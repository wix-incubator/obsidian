import { Identifier as IdentifierNode, Node } from "ts-morph";
import { Import } from "./import";

export class Identifier {
  constructor (private readonly node: IdentifierNode) { }

  public getText() {
    return this.node.getText();
  }

  public get import() {
    const declarations = this.node.getSymbol()?.getDeclarations();
    const declaration = declarations?.find(Node.isImportSpecifier);
    const importDeclaration = declaration?.getImportDeclaration();
    return importDeclaration && new Import(importDeclaration);
  }
}
