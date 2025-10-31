import type { TSESTree } from '@typescript-eslint/types';
import { isVariableDeclaration } from '../utils/ast';
import { Variable } from './variable';

export class File {
  constructor(private readonly program: TSESTree.Program) { }

  private get body() {
    return this.program.body;
  }

  get variables() {
    return this.body
      .filter(isVariableDeclaration)
      .map((node) => node.declarations)
      .flat()
      .map((node) => new Variable(node));
  }
}
