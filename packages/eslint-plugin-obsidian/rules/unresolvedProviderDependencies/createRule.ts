import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';
import type { TSESTree } from '@typescript-eslint/types';
import {
  getSubGraphs,
  getDependenciesFromSubgraphs,
  mapFunctions,
  checkDependencies,
  getDecoratorName,
  getPropertyDeclarations,
} from './ASTFunctions';
import type { PathResolver } from '../framework/pathResolver';

export function create(
  context: RuleContext<'unresolved-provider-dependencies', []>,
  pathResolver: PathResolver,
) {
  const imports:TSESTree.ImportDeclaration[] = [];
  const dependencies:string[] = [];

  return {
    ImportDeclaration(node: TSESTree.ImportDeclaration) {
      imports.push(node);
    },
    ClassDeclaration(node: TSESTree.ClassDeclaration) {
      const { decorators } = node;
      if (decorators) {
        const decoratorNames = decorators.map((decorator: TSESTree.Decorator) => getDecoratorName(decorator));
        if (decoratorNames.includes('Graph')) {
          const subGraphs = getSubGraphs(decorators);
          if (subGraphs.length > 0) {
            dependencies.push(...getDependenciesFromSubgraphs(imports, subGraphs, context, pathResolver));
          }
          dependencies.push(...mapFunctions(node));
          dependencies.push(...getPropertyDeclarations(node));
          const check = checkDependencies(node, dependencies);
          if (!check?.value) {
            context.report({
              node,
              messageId: 'unresolved-provider-dependencies',
              data: {
                dependencyName: check.param,
              },
            });
          }
        }
      }
    },
  };
}
