import type { TSESTree } from '@typescript-eslint/types';
import { getDecoratorProperty } from '../utils/ast';
import { Property } from './property';

interface CallExpression extends TSESTree.CallExpression {
  callee: TSESTree.Identifier;
}

export class Decorator {
  constructor(private node: TSESTree.Decorator) {}

  get expression() {
    return this.node.expression as CallExpression;
  }

  getProperty(name: string) {
    const property = getDecoratorProperty(this.node, name);
    return property && new Property(property);
  }
}
