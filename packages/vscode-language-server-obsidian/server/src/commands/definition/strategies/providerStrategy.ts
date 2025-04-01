import { TextDocument } from "vscode-languageserver-textdocument";
import { Logger } from "../../../services/logger";
import { GoToDefinitionStrategy } from "./goToDefinitionStrategy";
import ts = require("typescript");
import { getParentGraphRecursive } from "../../../utils/graphs";
import { Graph } from "../../../dto/graph";
import { ProviderDefinition } from "../../../dto/providerDefinition";
import { SourceFileCreator } from "../../../services/sourceFileCreator";
import { Definition } from "vscode-languageserver/node";

export class ProviderStrategy extends GoToDefinitionStrategy {
  constructor(private logger: Logger, private sourceFileCreator: SourceFileCreator) {
    super();
  }

  public async goToDefinition(node: ts.Node, document: TextDocument): Promise<Definition | undefined> {
    const graph = getParentGraphRecursive(node);
    return this.goToDefinitionInternal(graph, node, document);
  }

  private async goToDefinitionInternal(graph: Graph | undefined, node: ts.Node, document: TextDocument): Promise<Definition | undefined> {
    if (!graph) return;
    const providerName = ts.isParameter(node) ? node.name.getText() : node.getText();
    return graph.hasProvider(providerName) ?
      this.goToDefinitionInGraph(graph, providerName, document) :
      // TODO!: go to definition in nested subgraphs
      this.goToDefinitionInSubgraph(graph, providerName);
  }

  private goToDefinitionInGraph(graph: Graph, providerName: string, document: TextDocument) {
    const provider = graph.requireProvider(providerName);
    return new ProviderDefinition(document, provider, this.sourceFileCreator).json;
  }

  private async goToDefinitionInSubgraph(graph: Graph, providerName: string): Promise<Definition | undefined> {
    for (const { classDeclaration, document } of graph.getSubgraphs()) {
      const subgraph = getParentGraphRecursive(classDeclaration);
      if (!subgraph) continue;
      const provider = subgraph.requireProvider(providerName);
      return new ProviderDefinition(document, provider, this.sourceFileCreator).json;
    }
  }
}
