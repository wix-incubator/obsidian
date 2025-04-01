import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  TextDocumentPositionParams,
  Definition,
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DefinitionCommand } from './commands/definition/definition';
import { Logger } from './services/logger';
import { InitializeCommand } from './commands/initialize/initialize';

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);
export const logger = new Logger(connection);

connection.onInitialize((params: InitializeParams) => {
  return new InitializeCommand(logger).onInitialize(params);
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