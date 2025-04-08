import { getDecorator, getDecoratedMethods } from "../utils/decorators";
import { Provider } from "./provider";
import * as path from 'path';
import { ProviderDefinition } from "./providerDefinition";
import { getParentGraphRecursive } from "../utils/graphs";
import { ClassDeclaration, Identifier, ImportDeclaration, SourceFile, ts } from "ts-morph";
import { ProjectAdapter } from "../services/ast/project";
import { isArrayLiteralExpression, isIdentifier, isImportDeclaration, isNamedImports, isStringLiteral } from "../utils/tsMorph";
import { Definition } from "vscode-languageserver/node";
import { isDefined } from "../utils/objects";

interface SubgraphInfo {
  classDeclaration: ClassDeclaration;
  sourceFile: SourceFile;
}

function resolveModulePath(fileUri: string, moduleSpecifier: string): string {
  const filePath = fileUri.replace(/^file:\/\//, '');
  const directory = filePath.replace(/\/[^/]+$/, '');
  const resolvedPath = path.resolve(directory, moduleSpecifier);
  return resolvedPath.endsWith('.ts') ? resolvedPath : resolvedPath + '.ts';
}

export class Graph {
  constructor(
    private project: ProjectAdapter,
    private node: ClassDeclaration) { }

  private get name() {
    // TODO: may be undefined if class is exported as default
    return this.node.getName();
  }

  private get sourceFile() {
    return this.node.getSourceFile();
  }

  public toString(): string {
    return this.node.getText();
  }

  public getProviderDefinition(name: string) {
    return this.hasProvider(name) ?
      new ProviderDefinition(this.requireProvider(name)) :
      this.goToDefinitionInSubgraph(name);
  }

  public hasProvider(name: string): boolean {
    return this.findProvider(name) !== undefined;
  }

  private goToDefinitionInSubgraph(providerName: string) {
    for (const { classDeclaration } of this.getSubgraphs()) {
      const subgraph = getParentGraphRecursive(this.project, classDeclaration);
      if (!subgraph) continue;
      const provider = subgraph.requireProvider(providerName);
      return new ProviderDefinition(provider);
    }
  }

  public requireProviderTsMorph(name: string) {
    return this.findProviderTsMorph(name)!
  }

  private findProviderTsMorph(name: string) {
    const sourceFile = this.node.getSourceFile();
    const graph = sourceFile!.getClasses().find(graph => graph.getName() === this.name);
    return graph?.getMethods().find(method => method.getName() === name);
  }

  public requireProvider(name: string) {
    return this.findProvider(name)!;
  }

  public findProvider(name: string) {
    const provider = this.getProviders().find(
      provider => provider.getName() === name.replace(/^_/, '')
    );
    return provider && new Provider(provider);
  }

  public getProviders() {
    return getDecoratedMethods(this.node, ['Provides', 'provides']);
  }

  public getSubgraphs(): SubgraphInfo[] {
    const graphDecorator = getDecorator(this.node, ['Graph', 'graph']);
    if (!graphDecorator) return [];

    const subgraphsArg = graphDecorator.getArgument(0, 'subgraphs');
    if (!subgraphsArg || !isArrayLiteralExpression(subgraphsArg)) return [];


    return subgraphsArg.getElements()
      .filter(isIdentifier)
      .map(graph => {
        const graphName = graph.getText();
        const importDeclaration = this.project.findImportDeclaration(this.sourceFile, graphName)
        const moduleSourceFile = importDeclaration?.getModuleSpecifierSourceFile();
        const classDeclaration = moduleSourceFile?.getClass(graphName);
        return moduleSourceFile && classDeclaration && {
          classDeclaration,
          sourceFile: moduleSourceFile
        }
      })
      .filter(isDefined)
  }
}






