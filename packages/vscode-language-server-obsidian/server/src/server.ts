import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  TextDocumentPositionParams,
  Definition,
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DefinitionCommand } from './commands/definition/definitionCommand';
import { Logger } from './services/logger';
import { InitializeCommand } from './commands/initialize/initialize';
import { ProjectAdapter } from './services/ast/projectAdapter';

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);
export const logger = new Logger(connection);
const projectAdapter = new ProjectAdapter(documents);

connection.onInitialize((params: InitializeParams) => {
  return new InitializeCommand(logger).onInitialize(params);
});

connection.onDefinition((params: TextDocumentPositionParams): Promise<Definition | undefined> => {
  return new DefinitionCommand(projectAdapter, logger)
    .onDefinition(params)
    .catch((error: Error) => {
      logger.error('Error in go to definition', error);
      return undefined;
    });
});

documents.listen(connection);
connection.listen(); 