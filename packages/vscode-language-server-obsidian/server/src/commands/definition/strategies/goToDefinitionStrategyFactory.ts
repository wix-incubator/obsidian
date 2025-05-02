import { GoToDefinitionStrategy } from "./goToDefinitionStrategy";
import { hasProvidesDecorator } from "../../../utils/ts/decorators";
import { ProviderStrategy } from "./providerStrategy";
import { HookStrategy } from "./hookStrategy";
import { Node } from "ts-morph";
import { isDestructuredParameter, isParameter } from "../../../utils/ts/tsMorph";
import { ProjectAdapter } from "../../../services/project/projectAdapter";
import { InjectedClassStrategy } from "./injectedClassStrategy";
import { Logger } from "../../../services/logger";

export class StrategyFactory {

  constructor (private project: ProjectAdapter, private logger: Logger) { }

  public create(node: Node | undefined): GoToDefinitionStrategy | undefined {
    if (this.isProvider(node)) return new ProviderStrategy(this.project);
    if (this.isInjectedHookParameter(node)) return new HookStrategy(this.logger);
    if (this.isInjectedClass(node)) return new InjectedClassStrategy(this.logger);
    this.logger.error(`No strategy found for node: ${node?.getText()}`);
  }

  private isInjectedClass(node: Node | undefined): boolean {
    return Node?.isIdentifier(node);
  }

  private isInjectedHookParameter(node: Node | undefined): boolean {
    if (!node || !this.isValidHookName(node)) return false;

    if (isDestructuredParameter(node)) {
      return true;
    }

    if (Node.isIdentifier(node) && isDestructuredParameter(node.getParent())) {
      return this.isInjectedHookParameter(node.getParent());
    }
    return false;
  }

  private isValidHookName(node: Node | undefined): boolean {
    if (!node) return false;
    return /^use[A-Z][a-zA-Z]*$/.test(node.getText());
  }

  private isProvider(node: Node | undefined): boolean {
    if (isParameter(node)) return hasProvidesDecorator(node.getParent());
    if (Node.isIdentifier(node)) return hasProvidesDecorator(node.getParent()!.getParent());
    return false;
  }
}