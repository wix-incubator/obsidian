import type { TSESTree } from '@typescript-eslint/types';
import { Clazz } from '../../dto/class';
import { Context } from '../../dto/context';
import { GraphHandler } from './graphHandler';
import { CircularDependenciesDetector } from './circularDependenciesDetector';
import { ErrorReporter } from './errorReporter';

export function create(context: Context) {
  const graphHandler = new GraphHandler(
    new CircularDependenciesDetector(),
    new ErrorReporter(context),
  );

  return {
    ClassDeclaration(node: TSESTree.ClassDeclaration) {
      graphHandler.handle(new Clazz(node));
    },
  };
}
