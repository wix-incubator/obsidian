import type { TSESTree } from '@typescript-eslint/types';

interface CallExpression extends TSESTree.CallExpression {
  callee: TSESTree.Identifier;
}

export class Decorator {
  constructor(private node: TSESTree.Decorator) {}

  get expression() {
    return this.node.expression as CallExpression;
  }
}
