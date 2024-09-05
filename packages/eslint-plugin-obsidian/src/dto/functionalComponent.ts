import type { TSESTree } from '@typescript-eslint/types';
import { ComponentProps } from './componentProps';

export class FunctionalComponent {
  constructor(private node: TSESTree.ArrowFunctionExpression) {}

  get props(): ComponentProps {
    return new ComponentProps(this.node.params[0]);
  }
}
