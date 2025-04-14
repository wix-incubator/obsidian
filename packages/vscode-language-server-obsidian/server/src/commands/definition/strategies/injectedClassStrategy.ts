import { GoToDefinitionStrategy } from "./goToDefinitionStrategy";
import { ProjectAdapter } from "../../../services/ast/projectAdapter";
import { Definition } from "vscode-languageserver/node";
import { ClassDeclaration, Node, TypeAliasDeclaration, TypeReferenceNode, Symbol } from "ts-morph";
import { DependenciesOfResolver } from "../../../services/dependenciesOfResolver";
import { Graph } from "../../../dto/graph";
import { createDefinition } from "../helpers";

export class InjectedClassStrategy implements GoToDefinitionStrategy {
  private typeReferenceFinder: DependenciesOfResolver;

  constructor (private project: ProjectAdapter) {
    this.typeReferenceFinder = new DependenciesOfResolver(project);
  }

  public async goToDefinition(node: Node): Promise<Definition | undefined> {
    const dependenciesOf = this.typeReferenceFinder.resolve(node);
    const graphDeclarations = this.extractGraphsFromDependenciesOfDeclaration(dependenciesOf!);
    for (const graphDeclaration of graphDeclarations) {
      const graph = new Graph(this.project, graphDeclaration);
      const provider = graph.resolveProvider(node.getText());
      const returnType = provider.resolveReturnType();
      const sourceFile = this.project.getSourceFile(returnType!.import!.path);
      const classDeclaration = sourceFile?.getClass(returnType!.getText());
      return createDefinition(sourceFile!, classDeclaration!);
    }
  }

  private extractGraphsFromDependenciesOfDeclaration(alias: TypeAliasDeclaration): ClassDeclaration[] {
    const typeNode = alias.getTypeNode();
    if (!typeNode || !Node.isTypeReference(typeNode)) return [];

    const typeArgs = typeNode.getTypeArguments();
    if (typeArgs.length === 0) return [];

    const firstArg = typeArgs[0];
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
