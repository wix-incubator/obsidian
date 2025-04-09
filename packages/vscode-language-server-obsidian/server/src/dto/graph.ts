import { getDecorator, getDecoratedMethods } from "../utils/decorators";
import { Provider } from "./provider";
import * as path from 'path';
import { ClassDeclaration, Expression, ImportDeclaration, SourceFile } from "ts-morph";
import { ProjectAdapter } from "../services/ast/projectAdapter";
import { isDefined } from "../utils/objects";
import { isArrayLiteralExpression } from "../utils/tsMorph";

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

  public getProvider(name: string) {
    return this.hasProvider(name) ?
      this.requireProvider(name) :
      this.goToDefinitionInSubgraph(name);
  }

  public hasProvider(name: string): boolean {
    return this.findProvider(name) !== undefined;
  }

  private goToDefinitionInSubgraph(providerName: string): Provider {
    for (const graph of this.getSubgraphs()) {
      if (graph.hasProvider(providerName)) {
        return graph.getProvider(providerName);
      }
    }
    throw new Error(`Provider ${providerName} not found in ${this.name}`);
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

  public getSubgraphs(): Graph[] {
    return this.getSubgraphsFromDecorator()
      .map(this.getGraphFromSubgraph)
      .filter(isDefined)
  }

  private getGraphFromSubgraph(graph: Expression) {
    const graphName = graph.getText();
    const importDeclaration = this.project.findImportDeclaration(this.sourceFile, graphName)
    const classDeclaration = importDeclaration?.getModuleSpecifierSourceFile()?.getClass(graphName);
    return classDeclaration && new Graph(this.project, classDeclaration)
  }

  private getSubgraphsFromDecorator() {
    const graphDecorator = getDecorator(this.node, ['Graph', 'graph']);
    const subgraphsArg = graphDecorator?.getArgument(0, 'subgraphs');
    return isArrayLiteralExpression(subgraphsArg) ? subgraphsArg.getElements() : []
  }
}






