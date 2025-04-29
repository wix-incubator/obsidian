import { GoToDefinitionStrategy } from "./goToDefinitionStrategy";
import { hasProvidesDecorator } from "../../../utils/ts/decorators";
import { ProviderStrategy } from "./providerStrategy";
import { HookStrategy } from "./hookStrategy";
import { Node, TypeNode } from "ts-morph";
import { getTypeAliases, isBindingElement, isIdentifier, isIntersectionTypeNode, isObjectBindingPattern, isParameter, isParenthesizedTypeNode, isTypeAliasDeclaration, isTypeReferenceNode, isUnionTypeNode } from "../../../utils/ts/tsMorph";
import { ProjectAdapter } from "../../../services/project/projectAdapter";
import { InjectedClassStrategy } from "./injectedClassStrategy";
import { Logger } from "../../../services/logger";

export class StrategyFactory {

  constructor (
    private project: ProjectAdapter,
    private logger: Logger
  ) { }

  public create(node: Node | undefined): GoToDefinitionStrategy | undefined {
    if (this.isProvider(node)) return new ProviderStrategy(this.project);
    if (this.isInjectedHookParameter(node)) return new HookStrategy(this.logger);
    if (this.isInjectedClass(node)) return new InjectedClassStrategy(this.logger);
    this.logger.error(`No strategy found for node: ${node?.getText()}`);
    return undefined;
  }

  private isInjectedClass(node: Node | undefined): boolean {
    return Node?.isIdentifier(node);
  }

  private isInjectedHookParameter(node: Node | undefined): boolean {
    if (!node || !this.isValidHookName(node)) return false;

    // Check if it's a binding element (destructured parameter)
    if (Node.isBindingElement(node)) {
      const parent = node.getParent();
      if (!isObjectBindingPattern(parent)) return false;
      const parameterParent = parent.getParent();
      if (!isParameter(parameterParent)) return false;
      return true;
    }

    if (isIdentifier(node) && isBindingElement(node.getParent())) {
      return this.isInjectedHookParameter(node.getParent());
    }
    return false;
  }

  private isValidHookName(node: Node | undefined): boolean {
    if (!node) return false;
    return /^use[A-Z][a-zA-Z]*$/.test(node.getText());
  }

  private isDependenciesOfType(type: TypeNode | undefined): boolean {
    if (!type) return false;
    if (isTypeReferenceNode(type)) {
      const typeName = type.getTypeName().getText();
      if (typeName === 'DependenciesOf') return true;
      for (const typeAlias of getTypeAliases(type)) {
        if (this.isDependenciesOfType(typeAlias.getTypeNode())) return true;
      }
    }

    if (isIntersectionTypeNode(type) || isUnionTypeNode(type)) {
      return type.getTypeNodes().some(typeNode => this.isDependenciesOfType(typeNode));
    }

    if (isParenthesizedTypeNode(type)) {
      return this.isDependenciesOfType(type.getTypeNode());
    }

    if (isTypeAliasDeclaration(type)) {
      return this.isDependenciesOfType(type.getTypeNode());
    }

    return false;
  }

  private isProvider(node: Node | undefined): boolean {
    if (isParameter(node)) return hasProvidesDecorator(node.getParent());
    if (isIdentifier(node)) return hasProvidesDecorator(node.getParent()!.getParent());
    return false;
  }
}