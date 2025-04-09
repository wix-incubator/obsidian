import { Node, TypeReferenceNode, TypeNode, TypeAliasDeclaration, SourceFile, StringLiteral, Identifier } from "ts-morph";
import { ProjectAdapter } from "./ast/projectAdapter";

export class TypeReferenceFinder {
  constructor(private project: ProjectAdapter) { }

  public findTypeReference(node: Node): TypeAliasDeclaration | undefined {
    return Node.isIdentifier(node) ? this.findTypeReferenceInIdentifier(node as Identifier) : undefined;
  }

  private findTypeReferenceInIdentifier(node: Identifier) {
    const aliases = this.findAllMatchingAliases(node.getText());
    this.logMatches(aliases, node.getText());
    return aliases.length > 0 ? aliases[0] : undefined;
  }

  private findAllMatchingAliases(targetDependency: string): TypeAliasDeclaration[] {
    return this.project.getSourceFiles().flatMap(sourceFile => this.findMatchingAliasesInFile(sourceFile, targetDependency));
  }

  private findMatchingAliasesInFile(sourceFile: SourceFile, targetDependency: string): TypeAliasDeclaration[] {
    console.log(`🔎 Searching for ${targetDependency} in ${sourceFile.getTypeAliases().length} type aliases`);
    return sourceFile.getTypeAliases().filter(alias => this.matchesDependencyOfType(alias, targetDependency));
  }

  private matchesDependencyOfType(alias: TypeAliasDeclaration, targetDependency: string): boolean {
    const typeNode = alias.getTypeNode();
    if (!typeNode || !Node.isTypeReference(typeNode)) return false;
    if (!this.isDependenciesOfType(typeNode)) return false;

    const args = typeNode.getTypeArguments();
    if (args.length < 2) return false;

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