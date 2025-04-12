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

  public resolveProvider(name: string) {
    return this.hasProvider(name) ?
      this.requireProvider(name) :
      this.requireProviderFromSubgraphs(name);
  }

  public hasProvider(name: string): boolean {
    return this.findProvider(name) !== undefined;
  }

  private requireProviderFromSubgraphs(providerName: string): Provider {
    const subgraphs = this.getSubgraphs();
    for (const graph of subgraphs) {
      if (graph.hasProvider(providerName)) {
        return graph.resolveProvider(providerName);
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
      .map(graph => this.getGraphFromSubgraph(graph))
      .filter(isDefined)
  }

  private getGraphFromSubgraph(graph: Expression) {
    const graphName = graph.getText();
    const importDeclaration = this.project.findImportDeclaration(this.sourceFile, graphName)
    const sourceFile = this.project.addSourceFileFromImport(importDeclaration);
    const graphClass = sourceFile?.getClass(graphName)
    return graphClass && new Graph(this.project, graphClass)
  }

  private getSubgraphsFromDecorator() {
    const graphDecorator = getDecorator(this.node, ['Graph', 'graph']);
    const subgraphsArg = graphDecorator?.getArgument(0, 'subgraphs');
    return isArrayLiteralExpression(subgraphsArg) ? subgraphsArg.getElements() : []
  }
}






