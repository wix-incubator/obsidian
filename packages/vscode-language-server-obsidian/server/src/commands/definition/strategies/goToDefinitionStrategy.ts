import { Definition } from "vscode-languageserver/node";
import { Node } from "ts-morph";

export interface GoToDefinitionStrategy {
  goToDefinition(node: Node | undefined): Promise<Definition | undefined>;
}
