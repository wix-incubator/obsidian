import { GoToDefinitionStrategy } from "./goToDefinitionStrategy";
import { ProviderStrategy } from "./providerStrategy";
import { HookStrategy } from "./hookStrategy";
import { Node } from "ts-morph";
import { ProjectAdapter } from "../../../services/project/projectAdapter";
import { InjectedClassStrategy } from "./injectedClassStrategy";
import { Logger } from "../../../services/logger";
import { Identifier } from "../../../dto/identifier";

export class StrategyFactory {

  constructor (private project: ProjectAdapter, private logger: Logger) { }

  public create(node: Node | undefined): GoToDefinitionStrategy | undefined {
    if (!Node.isIdentifier(node)) return;
    switch (this.getType(node)) {
      case 'provider':
        return new ProviderStrategy(this.project);
      case 'hook':
        return new HookStrategy(this.logger);
      case 'injected':
        return new InjectedClassStrategy(this.logger);
      default:
        this.logger.error(`No strategy found for node: ${node?.getText()}`);
    }
  }

  private getType(node: Node) {
    const identifier = new Identifier(node);
    if (identifier.isProviderDependency()) return 'provider';
    if (identifier.isInjected()) return identifier.isHook() ? 'hook' : 'injected';
    return 'unknown';
  }
}
