import { TextDocument } from "vscode-languageserver-textdocument";
import ts = require("typescript");
import { Definition } from "vscode-languageserver/node";

export abstract class GoToDefinitionStrategy {
  public abstract goToDefinition(node: ts.Node | undefined, document: TextDocument): Promise<Definition | undefined>;
}
