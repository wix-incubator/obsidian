import {
  createConnection,
  ProposedFeatures,
  InitializeParams,
  TextDocumentPositionParams,
  Definition,
} from 'vscode-languageserver/node';
import { DefinitionCommand } from './commands/definition/definitionCommand';
import { Logger } from './services/logger';
import { InitializeCommand } from './commands/initialize/initialize';
import { ProjectAdapter } from './services/project/projectAdapter';
import { ProjectRegistry } from './services/project/projectRegistry';

const connection = createConnection(ProposedFeatures.all);
export const logger = new Logger(connection);
const projectRegistry = new ProjectRegistry(logger);
const projectAdapter = new ProjectAdapter(projectRegistry, logger);

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

connection.listen();
