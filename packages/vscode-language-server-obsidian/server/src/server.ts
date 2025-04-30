import {
  createConnection,
  ProposedFeatures,
  TextDocumentPositionParams,
  Definition,
  DidChangeConfigurationParams,
} from 'vscode-languageserver/node';
import { DefinitionCommand } from './commands/definition/definitionCommand';
import { Logger } from './services/logger';
import { InitializeHandler } from './lsp/handlers/initializeHandler';
import { ProjectAdapter } from './services/project/projectAdapter';
import { ProjectRegistry } from './services/project/projectRegistry';
import { TsConfigParser } from './services/tsConfig/tsconfigParser';
import { ConfigurationChangeHandler } from './lsp/handlers/configurationChangeHandler';

const connection = createConnection(ProposedFeatures.all);
export const logger = new Logger(connection);
const tsconfigParser = new TsConfigParser();
const projectRegistry = new ProjectRegistry(logger, tsconfigParser);
const projectAdapter = new ProjectAdapter(projectRegistry, logger);
const initializeHandler = new InitializeHandler(logger);
const configurationChangeHandler = new ConfigurationChangeHandler(logger);

connection.onInitialize(() => {
  return initializeHandler.handle();
});

connection.onDidChangeConfiguration((event: DidChangeConfigurationParams) => {
  configurationChangeHandler.handle(event);
});

connection.onDefinition((params: TextDocumentPositionParams): Promise<Definition | undefined> => {
  return new DefinitionCommand(projectAdapter, logger)
    .onDefinition(params)
    .then((definition: Definition | undefined) => {
      logger.info(`✅ Found definition: ${JSON.stringify(definition)}`);
      return definition;
    })
    .catch((error: Error) => {
      logger.error(`❌ Error in go to definition: ${error}`);
      return undefined;
    });
});

connection.onShutdown(() => {
  logger.debug('Language server is shutting down');
  projectRegistry.dispose();
});

connection.onExit(() => {
  logger.debug('Language server is exiting');
  projectRegistry.dispose();
});

connection.listen();
