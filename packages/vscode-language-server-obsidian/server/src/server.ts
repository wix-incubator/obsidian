import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  TextDocumentPositionParams,
  Definition,
  Location,
  Range,
  Position,
  Logger,
  LogMessageNotification,
  DefinitionLink
} from 'vscode-languageserver/node';

import {
  TextDocument
} from 'vscode-languageserver-textdocument';

import * as ts from 'typescript';
import { hasProvidesDecorator } from './utils/decorators';
import { Graph } from './dto/graph';
import { getParentGraphRecursive } from './utils/graphs';
import { duration } from './utils/duration';
import { ProviderDefinition } from './dto/providerDefinition';

// Create a connection for the server
const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

let logger: Logger;

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

connection.onDeclaration(async (params: TextDocumentPositionParams): Promise<Definition | null> => {
  logger.info(`onDeclaration: ${params.textDocument.uri}`);
  return null;
});

// Handle "Go to Definition" requests
connection.onDefinition(async (params: TextDocumentPositionParams): Promise<Definition | null> => {
  const document = documents.get(params.textDocument.uri);
  if (!document) {
    logger.error(`No document found for URI: ${params.textDocument.uri}`);
    return null;
  }

  const sourceFile = ts.createSourceFile(
    document.uri,
    document.getText(),
    ts.ScriptTarget.Latest,
    true
  );

  const position = document.offsetAt(params.position);
  const node = findNodeAtPosition(sourceFile, position);

  if (!node) {
    logger.info(`no node found at position: ${position}`);
    return null;
  }

  if (isProviderParameter(node)) {
    logger.info(`Found provider parameter ${node.getText()}`);
    return handleProviderParameterDefinition(node, document, params);
  }

  logger.info(`no provider parameter found at position: ${position}`);
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
    return null;
  }
}

function getTypeName(typeNode: ts.TypeNode): string | undefined {
  if (ts.isTypeReferenceNode(typeNode)) {
    return typeNode.typeName.getText();
  } else if (ts.isArrayTypeNode(typeNode)) {
    const elementType = typeNode.elementType;
    if (ts.isTypeReferenceNode(elementType)) {
      return elementType.typeName.getText();
    }
  }
  logger.warn(`getTypeName: ${typeNode.getText()} returned undefined`);
  return undefined;
}

function findNodeAtPosition(sourceFile: ts.SourceFile, position: number): ts.Node | undefined {
  function find(node: ts.Node): ts.Node | undefined {
    if (position >= node.getStart() && position < node.getEnd()) {
      return ts.forEachChild(node, find) || node;
    }
  }
  return find(sourceFile);
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

// Listen on the text document manager and connection
documents.listen(connection);
connection.listen(); 