import type { TSESTree } from '@typescript-eslint/types';
import { Identifier } from './identifier';
import { Generics } from './generics';

export class CallExpression {
  constructor(readonly node: TSESTree.CallExpression) { }

  public isExpression(name: string): boolean {
    return this.name === name;
  }

  get name(): string {
    return this.callee.name;
  }

  get parent(): TSESTree.Node {
    return this.node.parent!;
  }

  get arguments(): Identifier[] {
    return this.node.arguments.map((arg) => new Identifier(arg));
  }

  get generics() {
    return this.node.typeArguments ?
      new Generics(this.node.typeArguments) :
      // @ts-ignore
      this.node['typeParameters'] && new Generics(this.node['typeParameters']); // compatibility with typescript-eslint 8
  }

  private get callee(): TSESTree.Identifier {
    return this.node.callee as TSESTree.Identifier;
  }
}