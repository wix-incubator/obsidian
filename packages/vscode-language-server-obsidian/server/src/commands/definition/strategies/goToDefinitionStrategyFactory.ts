import { GoToDefinitionStrategy } from "./goToDefinitionStrategy";
import { hasProvidesDecorator } from "../../../utils/ts/decorators";
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
    const identifier = new Identifier(node);
    if (this.isProvider(identifier)) return new ProviderStrategy(this.project);
    if (this.isInjectedHookParameter(identifier)) return new HookStrategy(this.logger);
    if (this.isInjectedClass(identifier)) return new InjectedClassStrategy(this.logger);
    this.logger.error(`No strategy found for node: ${node?.getText()}`);
  }

  private isInjectedClass(identifier: Identifier): boolean {
    return identifier.isInjected();
  }

  private isInjectedHookParameter(identifier: Identifier): boolean {
    return identifier.isInjected() && identifier.isHook();
  }

  private isProvider(identifier: Identifier): boolean {
    return identifier.isProviderDependency();
  }
}