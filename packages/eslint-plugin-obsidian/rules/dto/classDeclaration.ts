import type { TSESTree } from '@typescript-eslint/types';
import { Decorator } from './decorator';

export class ClassDeclaration {
  constructor(public node: TSESTree.ClassDeclaration) {}

  get decoratorNames() {
    return this.decorators.map((decorator: Decorator) => {
      return decorator.expression.callee.name;
    }) || [];
  }

  get decorators() {
    return this.node.decorators.map((decorator: TSESTree.Decorator) => {
      return new Decorator(decorator);
    });
  }

  get body() {
    return this.node.body.body;
  }
}