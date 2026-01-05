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

  get arguments(): Identifier[] {
    return this.node.arguments.map((arg) => new Identifier(arg));
  }

  get generics() {
    // Support both typeParameters (@typescript-eslint v7+) and typeArguments (v6 and earlier)
    const typeParams = (this.node as any).typeParameters ?? this.node.typeArguments;
    return typeParams ?
      new Generics(typeParams) :
      undefined;
  }

  private get callee(): TSESTree.Identifier {
    return this.node.callee as TSESTree.Identifier;
  }
}