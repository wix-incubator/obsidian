import type { TSESTree } from '@typescript-eslint/types';
import { Decorator } from './decorator';
import { assertDefined } from '../utils/assertions';
import { isMethodDefinition } from '../utils/ast';
import { Method } from './method';

export class Clazz {
  constructor(public node: TSESTree.ClassDeclaration) {
    assertDefined(this.node);
  }

  public isDecoratedWith(decoratorName: string) {
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

  get body() {
    return this.node.body.body;
  }

  public getDecoratedMethods(decoratorName: string): Method[] {
    return this.body
      .filter(isMethodDefinition)
      .map(node => new Method(node))
      .filter(method => method.isDecoratedWith(decoratorName));
  }

  public requireDecorator(name: string) {
    const decorator = this.decorators.find(($decorator: Decorator) => {
      return $decorator.expression.callee.name.toLowerCase() === name.toLowerCase();
    });
    assertDefined(decorator, `Decorator ${name} not found on class ${this.name}`);
    return decorator;
  }

  private get name() {
    return this.node.id?.name;
  }
}
