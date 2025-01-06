import type { TSESTree } from '@typescript-eslint/types';
import { Decorator } from './decorator';
import { assertDefined } from '../utils/assertions';
import { isMethodDefinition } from '../utils/ast';
import { Method } from './method';
import { Identifier } from './identifier';

export class Clazz {
  constructor(public node: TSESTree.ClassDeclaration) {
    assertDefined(this.node);
  }

  get isAbstract() {
    return this.node.abstract;
  }

  public isDecoratedWithIgnoreCase(decoratorName: string) {
    return this.decoratorNames.some(name => name.toLowerCase() === decoratorName.toLowerCase());
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

  get superClass() {
    return this.node.superClass && new Identifier(this.node.superClass).name;
  }

  get body() {
    return this.node.body.body;
  }

  public mapDecoratedMethods<T>(decoratorName: string, mapper: (method: Method) => T): T[] {
    return this.getDecoratedMethods(decoratorName).map(mapper);
  }

  public getDecoratedMethods(decoratorName: string): Method[] {
    return this.body
      .filter(isMethodDefinition)
      .map(node => new Method(node))
      .filter(method => method.isDecoratedWithIgnoreCase(decoratorName));
  }

  public requireDecoratorIgnoreCase(name: string) {
    const decorator = this.decorators.find(($decorator: Decorator) => {
      return $decorator.expression.callee.name.toLowerCase() === name.toLowerCase();
    });
    assertDefined(decorator, `Decorator ${name} not found on class ${this.name}`);
    return decorator;
  }

  public get name() {
    return this.node.id?.name;
  }
}
