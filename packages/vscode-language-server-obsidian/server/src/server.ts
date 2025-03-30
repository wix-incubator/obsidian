import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  TextDocumentPositionParams,
  Definition,
  Logger
} from 'vscode-languageserver/node';

import {
  TextDocument
} from 'vscode-languageserver-textdocument';

import * as ts from 'typescript';
import { hasProvidesDecorator } from './utils/decorators';
import { getParentGraphRecursive } from './utils/graphs';
import { ProviderDefinition } from './dto/providerDefinition';
import { createSourceFile } from './utils/document';
import { getNodeAtPosition } from './utils/node';

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

export let logger: Logger;

connection.onInitialize((params: InitializeParams) => {
  logger = {
    error: (message: string) => connection.console.error(message),
    warn: (message: string) => connection.console.warn(message),
    info: (message: string) => connection.console.info(message),
    log: (message: string) => connection.console.log(message)
  };

  logger.info('Obsidian Language Server initialized');

  return {
    capabilities: {
      definitionProvider: true,
      textDocumentSync: {
        openClose: true,
        change: 1 // Incremental updates
      }
    }
  };
});

connection.onDefinition(async (params: TextDocumentPositionParams): Promise<Definition | null> => {
  const document = documents.get(params.textDocument.uri);
  if (!document) {
    logger.error(`No document found for URI: ${params.textDocument.uri}`);
    return null;
  }

  const node = getGoToDefinitionTarget(document, params);
  if (!node) {
    logger.info(`Tried to get definition for node at position ${params.position}, but no node found`);
    return null;
  }

  if (isProviderParameter(node)) return handleProviderParameterDefinition(node, document, params);
  return null;
});

async function handleProviderParameterDefinition(
  node: ts.ParameterDeclaration | ts.Identifier,
  document: TextDocument,
  params: TextDocumentPositionParams
): Promise<Definition | null> {
  const graph = getParentGraphRecursive(node);
  if (!graph) return null;

  const paramName = ts.isParameter(node) ? node.name.getText() : node.getText();
  if (graph.hasProvider(paramName)) {
    const provider = graph.requireProvider(paramName);
    return new ProviderDefinition(document, provider).json;
  } else {
    const subgraphs = graph.getSubgraphs();

    for (const { classDeclaration, sourceFile, document } of subgraphs) {
      if (!document) {
        logger.error(`No document found for URI: ${sourceFile.fileName}`);
        continue;
      }
      const subgraph = getParentGraphRecursive(classDeclaration);
      const provider = subgraph!.requireProvider(paramName);
      return new ProviderDefinition(document, provider).json;
    }
    return null;
  }
}

function getGoToDefinitionTarget(document: TextDocument, params: TextDocumentPositionParams): ts.Node | undefined {
  const sourceFile = createSourceFile(document);
  const position = document.offsetAt(params.position);
  return getNodeAtPosition(sourceFile, position);
}

function isProviderParameter(node: ts.Node): node is ts.ParameterDeclaration {
  if (ts.isParameter(node)) {
    return hasProvidesDecorator(node.parent);
  }
  if (ts.isIdentifier(node)) {
    return hasProvidesDecorator(node.parent.parent);
  }
  return false;
}

documents.listen(connection);
connection.listen(); 