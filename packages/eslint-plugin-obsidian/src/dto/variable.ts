import { TSESTree } from '@typescript-eslint/types';
import assert from 'assert';

export class Variable {
  constructor(private node: TSESTree.VariableDeclarator) {}

  get name() {
    return (this.node.id as TSESTree.Identifier).name;
  }

  get isArrowFunction(): boolean {
    return this.node.init?.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression;
  }

  get arrowFunction(): TSESTree.ArrowFunctionExpression {
    assert(this.isArrowFunction, 'Variable does not represent an arrow function');
    return this.node.init as TSESTree.ArrowFunctionExpression;
  }
}
