import { GoToDefinitionStrategy } from "./goToDefinitionStrategy";
import { hasProvidesDecorator } from "../../../utils/decorators";
import { ProviderStrategy } from "./providerStrategy";
import { HookStrategy } from "./hookStrategy";
import { Node, ParameterDeclaration, Identifier, TypeNode } from "ts-morph";
import { getTypeAliases, isBindingElement, isIdentifier, isIntersectionTypeNode, isObjectBindingPattern, isParameter, isParenthesizedTypeNode, isTypeAliasDeclaration, isTypeReferenceNode, isUnionTypeNode } from "../../../utils/tsMorph";
import { ProjectAdapter } from "../../../services/ast/projectAdapter";

export class StrategyFactory {

  constructor(private project: ProjectAdapter) { }

  public create(node: Node | undefined): GoToDefinitionStrategy | undefined {
    if (this.isProvider(node)) return new ProviderStrategy(this.project);
    if (this.isInjectedHookParameter(node)) return new HookStrategy(this.project);
    console.log('no strategy found for node');
    return undefined;
  }

  private isInjectedHookParameter(node: Node | undefined): node is ParameterDeclaration | Identifier {
    if (!node) return false;

    // Check if it's a binding element (destructured parameter)
    if (Node.isBindingElement(node)) {
      const parent = node.getParent();
      if (!isObjectBindingPattern(parent)) return false;
      const parameterParent = parent.getParent();
      if (!isParameter(parameterParent)) return false;
      return this.isDependenciesOfType(parameterParent.getTypeNode());
    }

    if (isIdentifier(node) && isBindingElement(node.getParent())) {
      return this.isInjectedHookParameter(node.getParent());
    }
    return false;
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

  private isProvider(node: Node | undefined): node is Node {
    if (isParameter(node)) return hasProvidesDecorator(node.getParent());
    if (isIdentifier(node)) return hasProvidesDecorator(node.getParent()!.getParent());
    return false;
  }
}