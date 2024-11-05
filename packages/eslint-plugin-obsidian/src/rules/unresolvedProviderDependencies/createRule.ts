import type { TSESTree } from '@typescript-eslint/types';
import { Clazz } from '../../dto/class';
import { Context } from '../../dto/context';
import { GraphHandler } from './graphHandler';
import { FileReader } from '../../framework/fileReader';
import { DependencyResolver } from './dependencyResolver';
import { Import } from '../../dto/import';
import { SubgraphResolver } from './subgraphResolver';
import { ClassResolver } from './classResolver';

export function create(context: Context, fileReader: FileReader) {
  const imports: Import[] = [];
  const dependencyResolver = new DependencyResolver(
    new SubgraphResolver(fileReader),
    new ClassResolver(fileReader),
  );
  const graphHandler = new GraphHandler(context, dependencyResolver);

  return {
    ImportDeclaration(node: TSESTree.ImportDeclaration) {
      imports.push(new Import(node));
    },
    ClassDeclaration(node: TSESTree.ClassDeclaration) {
      graphHandler.handle(new Clazz(node), imports);
    },
  };
}
