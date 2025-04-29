import { GoToDefinitionStrategy } from "./goToDefinitionStrategy";
import { Definition } from "vscode-languageserver/node";
import { Node } from "ts-morph";
import { createDefinition } from "../helpers";
import { Logger } from "../../../services/logger";

export class InjectedClassStrategy implements GoToDefinitionStrategy {
  constructor (private logger: Logger) { }

  public async goToDefinition(node: Node): Promise<Definition | undefined> {
    const declarations = node.getSymbol()?.getDeclarations();
    const clazzDeclaration = this.resolveInjectedClass(declarations);
    return clazzDeclaration && createDefinition(this.logger, clazzDeclaration.getSourceFile(), clazzDeclaration);
  }

  private resolveInjectedClass(declarations: Node[] | undefined) {
    if (declarations?.length !== 1) return;
    const symbol = declarations[0]?.getType()?.getSymbol();
    return symbol?.getDeclarations()[0];
  }
}
