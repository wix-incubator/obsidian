import { Logger } from "../../services/logger";
import { Definition, TextDocumentPositionParams, } from "vscode-languageserver/node";
import { StrategyFactory } from "./strategies/goToDefinitionStrategyFactory";
import { ProjectAdapter } from "../../services/project/projectAdapter";
import { Node } from "ts-morph";
import { SourceFile } from "../../dto/sourceFile";

export class DefinitionCommand {

  constructor (
    private projectAdapter: ProjectAdapter,
    private logger: Logger,
    private strategyFactory: StrategyFactory = new StrategyFactory(projectAdapter, logger)
  ) {
    this.logger.debug(`DefinitionCommand constructor`);
  }

  public async onDefinition(params: TextDocumentPositionParams): Promise<Definition | undefined> {
    const sourceFile = this.projectAdapter.getSourceFileOrThrow(params.textDocument.uri);
    const node = sourceFile.getNodeAtPosition(params.position);
    this.logCommand(node, sourceFile, params);
    return this.strategyFactory.create(node)?.goToDefinition(node);
  }

  private logCommand(node: Node | undefined, sourceFile: SourceFile, params: TextDocumentPositionParams) {
    this.logger.info(`🔍 Searching for node definition: ${node?.getText()}`);
    this.logger.debug(`Source file: ${sourceFile.filePath}`);
    this.logger.debug(`Position: ${JSON.stringify(params.position)}`);
  }
}
