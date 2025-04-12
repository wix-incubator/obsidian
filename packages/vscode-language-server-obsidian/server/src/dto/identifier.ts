import { Identifier as IdentifierNode, ImportClause, ImportDeclaration, ImportSpecifier, Node } from "ts-morph";
import { Import } from "./import";

export class Identifier {
  constructor (private readonly node: IdentifierNode) { }

  public getText() {
    return this.node.getText();
  }

  public get import() {
    const declarations = this.node.getSymbol()?.getDeclarations();
    const declaration = declarations?.find(d => Node.isImportSpecifier(d) || Node.isImportClause(d));
    const importDeclaration = this.getImportDeclaration(declaration);
    return importDeclaration && new Import(importDeclaration);
  }

  private getImportDeclaration(declaration: ImportSpecifier | ImportClause | undefined) {
    if (Node.isImportSpecifier(declaration)) {
      return declaration.getImportDeclaration();
    } else if (Node.isImportClause(declaration)) {
      return declaration.getParent() as ImportDeclaration;
    }
  }
}
