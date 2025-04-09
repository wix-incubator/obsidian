import { GoToDefinitionStrategy } from "./goToDefinitionStrategy";
import { getParentGraphRecursive } from "../../../utils/graphs";
import { Definition } from "vscode-languageserver/node";
import { Node } from "ts-morph";
import { isParameter } from "../../../utils/tsMorph";
import { ProjectAdapter } from "../../../services/ast/projectAdapter";

export class ProviderStrategy implements GoToDefinitionStrategy {
  constructor(private project: ProjectAdapter) { }

  public async goToDefinition(node: Node): Promise<Definition | undefined> {
    const graph = getParentGraphRecursive(this.project, node);
    const providerName = isParameter(node) ? node.getName() : node.getText();
    return graph?.getProvider(providerName)?.definition;
  }
}
