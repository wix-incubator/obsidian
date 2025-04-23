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
import { TsConfigParser } from './services/tsConfig/tsconfigParser';

const connection = createConnection(ProposedFeatures.all);
export const logger = new Logger(connection);
const tsconfigParser = new TsConfigParser();
const projectRegistry = new ProjectRegistry(logger, tsconfigParser);
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

connection.onShutdown(() => {
  logger.info('Language server is shutting down');
  projectRegistry.dispose();
});

connection.onExit(() => {
  logger.info('Language server is exiting');
  projectRegistry.dispose();
});

connection.listen();
