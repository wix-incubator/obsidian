import { Node, TypeReferenceNode, TypeNode, TypeAliasDeclaration, SourceFile, StringLiteral, Identifier } from "ts-morph";
import { ProjectAdapter } from "./project/projectAdapter";

export class DependenciesOfResolver {
  constructor (private project: ProjectAdapter) { }

  public resolve(node: Node): TypeAliasDeclaration | undefined {
    return this.findDependenciesOfTypeInCurrentFile(node);
  }

  private findDependenciesOfRecursive(node: Node): TypeAliasDeclaration | undefined {
    const symbol = node.getSymbol();
    if (!symbol) return;

    const declarations = symbol.getDeclarations();
    for (const declaration of declarations) {
      const declarationSymbol = declaration?.getType()?.getSymbol();
      console.log(declarationSymbol?.getDeclarations()[0]?.getKindName());
      console.log(declarationSymbol?.getDeclarations()[0]?.getText());
    }
  }

  private findDependenciesOfTypeInCurrentFile(node: Node) {
    return node
      .getSourceFile()
      .getTypeAliases()
      .find(alias => this.matchesDependencyOfType(alias, node.getText()));
  }

  private matchesDependencyOfType(alias: TypeAliasDeclaration, targetDependency: string) {
    const typeNode = alias.getTypeNode();
    if (!Node.isTypeReference(typeNode) || !this.isDependenciesOfType(typeNode)) return;

    const args = typeNode.getTypeArguments();
    if (args.length < 2) return;

    const dependencyKeys = this.extractDependencyKeys(args[1]);
    return dependencyKeys.includes(targetDependency);
  }

  private isDependenciesOfType(node: TypeReferenceNode): boolean {
    return node.getTypeName().getText() === "DependenciesOf";
  }

  private extractDependencyKeys(arg: TypeNode): string[] {
    if (Node.isLiteralTypeNode(arg) && Node.isStringLiteral(arg.getLiteral())) {
      return [(arg.getLiteral() as StringLiteral).getLiteralValue()];
    }

    if (Node.isUnionTypeNode(arg)) {
      return arg.getTypeNodes()
        .filter(Node.isLiteralTypeNode)
        .map(n => n.getLiteral())
        .filter(Node.isStringLiteral)
        .map(lit => lit.getLiteralValue());
    }

    return [];
  }

  private logMatches(aliases: TypeAliasDeclaration[], targetDependency: string) {
    if (aliases.length === 0) {
      console.log(`❌ No type aliases found for '${targetDependency}'`);
      return;
    }

    console.log(`✅ Found ${aliases.length} match(es):\n`);
    for (const alias of aliases) {
      const name = alias.getName();
      const path = alias.getSourceFile().getFilePath();
      console.log(`🔹 ${name} — ${path}`);
      console.log(alias.getText());
      console.log("—".repeat(40));
    }
  }
}