import type { TSESTree } from '@typescript-eslint/types';
import { Clazz } from '../dto/class';
import type { Context } from './types';
import { GraphHandler } from './graphHandler';
import { FileReader } from '../framework/fileReader';
import { DependencyResolver } from './dependencyResolver';
import { Import } from '../dto/import';

export function create(context: Context, fileReader: FileReader) {
  const imports: Import[] = [];
  const graphHandler = new GraphHandler(context, new DependencyResolver(fileReader));

  return {
    ImportDeclaration(node: TSESTree.ImportDeclaration) {
      imports.push(new Import(node));
    },
    ClassDeclaration(node: TSESTree.ClassDeclaration) {
      graphHandler.handle(new Clazz(node), imports);
    },
  };
}
