import type { TSESTree } from '@typescript-eslint/types';
import { Decorator } from './decorator';
import { Parameter } from './parameter';

export class Method {
  constructor(public readonly node: TSESTree.MethodDefinition) {}

  get name() {
    return (this.node.key as TSESTree.Identifier).name;
  }

  get parameters() {
    return this.node.value.params.map(param => new Parameter(param));
  }

  isDecoratedWithIgnoreCase(decoratorName: string): boolean {
    return this.decorators.some((decorator) => {
      return decorator.expression.callee.name.toLowerCase() === decoratorName.toLowerCase();
    });
  }

  private get decorators() {
    return (this.node.decorators ?? []).map((decorator) => {
      return new Decorator(decorator);
    }) || [];
  }
}
