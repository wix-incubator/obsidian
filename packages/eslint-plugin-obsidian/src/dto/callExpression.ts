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
    return this.node.parent;
  }

  get arguments(): Identifier[] {
    return this.node.arguments.map(arg => new Identifier(arg));
  }

  get generics() {
    if (this.node.typeArguments) {
      return new Generics(this.node.typeArguments);
    }
    // @ts-expect-error - compatibility with typescript-eslint 8
    const typeParametersESLint8 = this.node['typeParameters'] as unknown;
    if (typeParametersESLint8) {
      return new Generics(typeParametersESLint8 as TSESTree.TSTypeParameterInstantiation);
    }

    return Generics.EMPTY;
  }

  private get callee(): TSESTree.Identifier {
    return this.node.callee as TSESTree.Identifier;
  }
}
