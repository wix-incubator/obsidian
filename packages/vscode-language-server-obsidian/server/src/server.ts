import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  TextDocumentPositionParams,
  Definition,
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DefinitionCommand } from './commands/definition';
import { Logger } from './services/logger';

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);
export const logger = new Logger(connection);

connection.onInitialize((params: InitializeParams) => {
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

connection.onDefinition((params: TextDocumentPositionParams): Promise<Definition | undefined> => {
  return new DefinitionCommand(documents, logger)
    .onDefinition(params)
    .catch((error: Error) => {
      logger.error('Error in go to definition', error);
      return undefined;
    });
});

documents.listen(connection);
connection.listen(); 