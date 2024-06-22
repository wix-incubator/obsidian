import type { TSESTree } from '@typescript-eslint/types';
import type { PathResolver } from '../framework/pathResolver';
import { ClassDeclaration } from '../dto/classDeclaration';
import type { Context } from './types';
import { GraphHandler } from './graphHandler';

export function create(context: Context,pathResolver: PathResolver) {
  const imports: TSESTree.ImportDeclaration[] = [];
  const graphHandler = new GraphHandler(context, pathResolver, imports);

  return {
    ImportDeclaration(node: TSESTree.ImportDeclaration) {
      imports.push(node);
    },
    ClassDeclaration(node: TSESTree.ClassDeclaration) {
      graphHandler.handle(new ClassDeclaration(node));
    },
  };
}
