import { TextDocument } from "vscode-languageserver-textdocument";
import { Logger } from "../../services/logger";
import { Definition, TextDocumentPositionParams, TextDocuments } from "vscode-languageserver/node";
import ts = require("typescript");
import { getNodeAtPosition } from "../../utils/node";
import { assert } from "../../utils/assertions";
import { SourceFileCreator } from "../../services/sourceFileCreator";
import { StrategyFactory } from "./strategies/goToDefinitionStrategyFactory";

export class DefinitionCommand {

  constructor(
    private documents: TextDocuments<TextDocument>,
    private logger: Logger,
    private sourceFileCreator: SourceFileCreator = new SourceFileCreator(),
    private strategyFactory: StrategyFactory = new StrategyFactory(this.logger, sourceFileCreator)
  ) {
    this.logger.info(`DefinitionCommand constructor`);
  }

  public async onDefinition(params: TextDocumentPositionParams): Promise<Definition | undefined> {
    const document = this.getDocument(params);
    const node = this.getGoToDefinitionNode(document, params);
    return this.strategyFactory.create(node, document)?.goToDefinition(node!, document)
  }

  private getDocument(params: TextDocumentPositionParams): TextDocument {
    const document = this.documents.get(params.textDocument.uri);
    assert("No document found for URI: " + params.textDocument.uri, document);
    return document;
  }

  private getGoToDefinitionNode(document: TextDocument, params: TextDocumentPositionParams) {
    const sourceFile = this.sourceFileCreator.create(document);
    const position = document.offsetAt(params.position);
    const node = getNodeAtPosition(sourceFile, position);
    return node;
  }
}
