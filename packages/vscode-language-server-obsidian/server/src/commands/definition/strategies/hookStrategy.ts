import { GoToDefinitionStrategy } from "./goToDefinitionStrategy";
import {
  TypeAliasDeclaration,
  TypeReferenceNode,
  Node,
  ClassDeclaration,
  Symbol,
  MethodDeclaration,
  SyntaxKind,
  CallExpression,
} from "ts-morph";
import { DependenciesOfResolver } from "../../../services/typeReferenceFinder";
import { Graph } from "../../../dto/graph";
import { Definition } from "vscode-languageserver/node";
import { ProjectAdapter } from "../../../services/ast/projectAdapter";
import { createDefinition } from "../helpers";

export class HookStrategy implements GoToDefinitionStrategy {
  private typeReferenceFinder: DependenciesOfResolver;

  constructor (private project: ProjectAdapter) {
    this.typeReferenceFinder = new DependenciesOfResolver(project);
  }

  public async goToDefinition(node: Node): Promise<Definition | undefined> {
    const dependenciesOf = this.typeReferenceFinder.resolve(node);
    const graphDeclarations = this.extractGraphsFromDependenciesOfDeclaration(dependenciesOf!);
    if (graphDeclarations.length > 0) {
      const graph = new Graph(this.project, graphDeclarations[0]);
      const provider = graph.requireProviderTsMorph(node.getText());
      const hookCallStatement = this.findHookCallStatement(provider);
      const references = hookCallStatement?.getExpressionIfKind(SyntaxKind.Identifier)?.findReferencesAsNodes() || [];
      for (const reference of references) {
        const symbol = reference.getSymbol();
        if (symbol && symbol.getDeclarations().length > 0) {
          const declaration = symbol.getDeclarations()[0];
          if (Node.isVariableDeclaration(declaration)) {
            return createDefinition(declaration.getSourceFile(), declaration);
          }
        }
      }
    }
  }

  private findHookCallStatement(node: MethodDeclaration): CallExpression | undefined {
    if (!node.getBody()) return;
    const statements = node.getBody()!.getDescendantStatements();
    return statements.find(statement => Node.isCallExpression(statement)) as CallExpression | undefined;
  }

  private extractGraphsFromDependenciesOfDeclaration(alias: TypeAliasDeclaration): ClassDeclaration[] {
    const typeNode = alias.getTypeNode();
    if (!typeNode || !Node.isTypeReference(typeNode)) return [];

    const typeArgs = typeNode.getTypeArguments();
    if (typeArgs.length === 0) return [];

    const firstArg = typeArgs[0]; // Could be identifier or tuple
    if (Node.isTypeReference(firstArg)) {
      return [this.resolveGraphTypeReference(firstArg)].filter(Boolean) as ClassDeclaration[];
    }

    if (Node.isTupleTypeNode(firstArg)) {
      return firstArg
        .getElements()
        .map(element => {
          return Node.isTypeReference(element)
            ? this.resolveGraphTypeReference(element)
            : undefined;
        })
        .filter(Boolean) as ClassDeclaration[];
    }

    return [];
  }

  private resolveGraphTypeReference(ref: TypeReferenceNode): ClassDeclaration | undefined {
    const typeNameNode = ref.getTypeName();
    const symbol: Symbol | undefined = typeNameNode.getSymbol?.();
    if (!symbol) return;

    for (const decl of symbol.getDeclarations()) {
      if (Node.isClassDeclaration(decl)) return decl;

      if (Node.isImportSpecifier(decl)) {
        const aliasedSymbol = decl.getSymbol()?.getAliasedSymbol();
        if (!aliasedSymbol) continue;

        for (const targetDecl of aliasedSymbol.getDeclarations()) {
          if (Node.isClassDeclaration(targetDecl)) return targetDecl;
        }
      }
    }

    return;
  }
}
