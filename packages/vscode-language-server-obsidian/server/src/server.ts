import {
  createConnection,
  ProposedFeatures,
  TextDocumentPositionParams,
  Definition,
  DidChangeConfigurationParams,
  CompletionItem,
  CompletionParams,
} from 'vscode-languageserver/node';
import { DefinitionCommand } from './commands/definition/definitionCommand';
import { CompletionCommand } from './commands/completion/completionCommand';
import { Logger } from './services/logger';
import { InitializeHandler } from './lsp/handlers/initializeHandler';
import { ProjectAdapter } from './services/project/projectAdapter';
import { ProjectRegistry } from 'ts-morph-extensions';
import { ConfigurationChangeHandler } from './lsp/handlers/configurationChangeHandler';
import { ChangeTextHandler } from './lsp/handlers/changeTextHandler';
import { FileOpenHandler } from './lsp/handlers/fileOpenHandler';

const connection = createConnection(ProposedFeatures.all);
const logger = new Logger(connection);
const projectRegistry = new ProjectRegistry({ logger });
const projectAdapter = new ProjectAdapter(projectRegistry);
const initializeHandler = new InitializeHandler(logger);
const configurationChangeHandler = new ConfigurationChangeHandler(logger);
const changeTextHandler = new ChangeTextHandler(projectAdapter);
const fileOpenHandler = new FileOpenHandler(projectAdapter);

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

connection.onCompletion((params: CompletionParams): Promise<CompletionItem[]> => {
  return new CompletionCommand(projectAdapter, logger)
    .getCompletions(params)
    .then((completions: CompletionItem[]) => {
      logger.info(`✅ Found ${completions.length} completions`);
      return completions;
    })
    .catch((error: Error) => {
      logger.error(`❌ Error in completion: ${error}`);
      return [];
    });
});

connection.onDidChangeTextDocument(params => {
  changeTextHandler.handle(params);
});

connection.onDidOpenTextDocument(params => {
  fileOpenHandler.handle(params);
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
