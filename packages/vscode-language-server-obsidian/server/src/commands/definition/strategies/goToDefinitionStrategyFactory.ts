import ts = require("typescript");
import { GoToDefinitionStrategy } from "./goToDefinitionStrategy";
import { TextDocument } from "vscode-languageserver-textdocument";
import { hasProvidesDecorator } from "../../../utils/decorators";
import { ProviderStrategy } from "./providerStrategy";
import { Logger } from "../../../services/logger";
import { SourceFileCreator } from "../../../services/sourceFileCreator";

export class StrategyFactory {
  constructor(private logger: Logger, private sourceFileCreator: SourceFileCreator) { }

  public create(node: ts.Node | undefined, document: TextDocument): GoToDefinitionStrategy | undefined {
    if (this.isProvider(node)) {
      return new ProviderStrategy(this.logger, this.sourceFileCreator);
    }
    return undefined;
  }

  private isProvider(node: ts.Node | undefined): node is ts.ParameterDeclaration | ts.Identifier {
    if (!node) return false;
    if (ts.isParameter(node)) {
      return hasProvidesDecorator(node.parent);
    }
    if (ts.isIdentifier(node)) {
      return hasProvidesDecorator(node.parent.parent);
    }
    return false;
  }
}