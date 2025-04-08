import { TextDocument } from "vscode-languageserver-textdocument";
import { Logger } from "../../services/logger";
import { Definition, TextDocumentPositionParams, TextDocuments, } from "vscode-languageserver/node";
import { StrategyFactory } from "./strategies/goToDefinitionStrategyFactory";
import { ProjectAdapter } from "../../services/ast/project";
import { SourceFile, Node } from "ts-morph";

export class DefinitionCommand {

  constructor(
    private projectAdapter: ProjectAdapter,
    private logger: Logger,
    private strategyFactory: StrategyFactory = new StrategyFactory(projectAdapter)
  ) {
    this.logger.info(`DefinitionCommand constructor`);
  }

  public async onDefinition(params: TextDocumentPositionParams): Promise<Definition | undefined> {
    const sourceFile = this.projectAdapter.addSourceFile(params);
    const node = this.getGoToDefinitionNode(sourceFile, params);
    const tsMorphNode = node ? sourceFile.getDescendantAtPos(node.getStart()) : undefined;
    return this.strategyFactory.create(node)?.goToDefinition(tsMorphNode)
  }

  private getGoToDefinitionNode(sourceFile: SourceFile, params: TextDocumentPositionParams): Node | undefined {
    const position = sourceFile.compilerNode.getPositionOfLineAndCharacter(
      params.position.line,
      params.position.character
    );
    return sourceFile.getDescendantAtPos(position);
  }
}
