import type { TSESTree } from '@typescript-eslint/types';
import { Decorator } from './decorator';
import { assertDefined } from '../utils/assertions';
import { isMethodDefinition } from '../utils/ast';
import { Method } from './method';

export class Clazz {
  constructor(public node: TSESTree.ClassDeclaration) {
    assertDefined(this.node);
  }

  get isGraph() {
    return this.isDecoratedWithIgnoreCase('Graph');
  }

  public isDecoratedWithIgnoreCase(decoratorName: string) {
    return this.decoratorNames.some(name => name.toLowerCase() === decoratorName.toLowerCase());
  }

  public requireMethodParameter(methodName: string, parameterName: string) {
    return this.requireMethod(methodName).requireParameter(parameterName);
  }

  public requireMethod(name: string) {
    return this.findMethod(name)!;
  }

  public findMethod(name: string) {
    return this.getMethods().find(method => method.name === name);
  }

  get decoratorNames() {
    return this.decorators.map((decorator: Decorator) => {
      return decorator.expression.callee.name;
    }) || [];
  }

  get decorators() {
    return (this.node.decorators ?? []).map((decorator: TSESTree.Decorator) => {
      return new Decorator(decorator);
    });
  }

  get body() {
    return this.node.body.body;
  }

  public getDecoratedMethods(decoratorName: string): Method[] {
    return this.getMethods()
      .filter(method => method.isDecoratedWithIgnoreCase(decoratorName));
  }

  public getMethods(): Method[] {
    return this.body
      .filter(isMethodDefinition)
      .map((node) => new Method(node));
  }
}
