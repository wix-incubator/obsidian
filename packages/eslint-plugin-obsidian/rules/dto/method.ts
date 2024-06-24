import type { TSESTree } from '@typescript-eslint/types';
import { Decorator } from './decorator';

export class Method {

  constructor(private node: TSESTree.MethodDefinition) {}

  get name() {
    return (this.node.key as TSESTree.Identifier).name;
  }

  isDecoratedWith(decoratorName: string): boolean {
    return this.decorators.some((decorator) => {
      return decorator.expression.callee.name === decoratorName;
    });
  }

  private get decorators() {
    return this.node.decorators.map((decorator) => {
      return new Decorator(decorator);
    }) || [];
  }
}
