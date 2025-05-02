import { Logger } from "../../services/logger";
import { Definition, TextDocumentPositionParams, } from "vscode-languageserver/node";
import { StrategyFactory } from "./strategies/goToDefinitionStrategyFactory";
import { ProjectAdapter } from "../../services/project/projectAdapter";
import { SourceFile, Node } from "ts-morph";

export class DefinitionCommand {

  constructor (
    private projectAdapter: ProjectAdapter,
    private logger: Logger,
    private strategyFactory: StrategyFactory = new StrategyFactory(projectAdapter, logger)
  ) {
    this.logger.debug(`DefinitionCommand constructor`);
  }

  public async onDefinition(params: TextDocumentPositionParams): Promise<Definition | undefined> {
    const sourceFile = this.projectAdapter.getSourceFile(params.textDocument.uri);
    if (!sourceFile) throw new Error(`Source file not found for URI: ${params.textDocument.uri}`);
    const node = this.getGoToDefinitionNode(sourceFile, params);
    this.logCommand(node, sourceFile, params);
    const tsMorphNode = node ? sourceFile.getDescendantAtPos(node.getStart()) : undefined;
    return this.strategyFactory.create(node)?.goToDefinition(tsMorphNode);
  }

  private getGoToDefinitionNode(sourceFile: SourceFile, params: TextDocumentPositionParams): Node | undefined {
    const position = sourceFile.compilerNode.getPositionOfLineAndCharacter(
      params.position.line,
      params.position.character
    );
    return sourceFile.getDescendantAtPos(position);
  }

  private logCommand(node: Node | undefined, sourceFile: SourceFile, params: TextDocumentPositionParams) {
    this.logger.info(`🔍 Searching for node definition: ${node?.getText()}`);
    this.logger.debug(`Source file: ${sourceFile.getFilePath()}`);
    this.logger.debug(`Position: ${JSON.stringify(params.position)}`);
  }
}
