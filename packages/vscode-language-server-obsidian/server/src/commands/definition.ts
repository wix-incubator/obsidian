import { TextDocument } from "vscode-languageserver-textdocument";
import { Logger } from "../services/logger";
import { Definition, TextDocumentPositionParams, TextDocuments } from "vscode-languageserver/node";
import ts = require("typescript");
import { createSourceFile } from "../utils/document";
import { getNodeAtPosition } from "../utils/node";
import { hasProvidesDecorator } from "../utils/decorators";
import { getParentGraphRecursive } from "../utils/graphs";
import { assert } from "../utils/assertions";
import { ProviderDefinition } from "../dto/providerDefinition";
import { Graph } from "../dto/graph";

export class DefinitionCommand {

  constructor(
    private params: TextDocumentPositionParams,
    private documents: TextDocuments<TextDocument>,
    private logger: Logger
  ) {
    this.logger.info(`DefinitionCommand constructor`);
  }

  public async onDefinition(): Promise<Definition | undefined> {
    const document = this.getDocument();
    const node = this.getGoToDefinitionNode(document);
    return this.goToDefinitionIfProvider(node, document);
  }

  private goToDefinitionIfProvider(node: ts.Node | undefined, document: TextDocument) {
    if (!this.isProvider(node)) {
      this.logger.info(`Node is not a provider parameter: ${node?.getText()}`);
      return;
    };
    const graph = getParentGraphRecursive(node);
    return this.goToDefinition(graph, node, document);
  }

  private async goToDefinition(graph: Graph | undefined, node: ts.Node, document: TextDocument): Promise<Definition | undefined> {
    if (!graph) return;
    const providerName = ts.isParameter(node) ? node.name.getText() : node.getText();
    return graph.hasProvider(providerName) ?
      this.goToDefinitionInGraph(graph, providerName, document) :
      // TODO!: go to definition in nested subgraphs
      this.goToDefinitionInSubgraph(graph, providerName);
  }

  private async goToDefinitionInSubgraph(graph: Graph, providerName: string): Promise<Definition | undefined> {
    for (const { classDeclaration, document } of graph.getSubgraphs()) {
      const subgraph = getParentGraphRecursive(classDeclaration);
      if (!subgraph) continue;
      const provider = subgraph.requireProvider(providerName);
      return new ProviderDefinition(document, provider).json;
    }
  }

  private goToDefinitionInGraph(graph: Graph, providerName: string, document: TextDocument) {
    const provider = graph.requireProvider(providerName);
    return new ProviderDefinition(document, provider).json;
  }

  private getDocument(): TextDocument {
    const document = this.documents.get(this.params.textDocument.uri);
    assert("No document found for URI: " + this.params.textDocument.uri, document);
    return document;
  }

  private getGoToDefinitionNode(document: TextDocument) {
    const sourceFile = createSourceFile(document);
    const position = document.offsetAt(this.params.position);
    const node = getNodeAtPosition(sourceFile, position);
    return node;
  }

  private isProvider(node: ts.Node | undefined): node is ts.ParameterDeclaration | ts.Identifier {
    if (!node) return false;
    if (ts.isParameter(node)) {
      return hasProvidesDecorator(node.parent);
    }
    if (ts.isIdentifier(node)) {
      return hasProvidesDecorator(node.parent.parent);
    }
    return false;
  }
}
