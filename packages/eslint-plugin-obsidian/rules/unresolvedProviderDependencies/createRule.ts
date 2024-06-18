import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';
import type { TSESTree } from '@typescript-eslint/types';
import {
  getSubGraphs,
  getDependenciesFromSubgraphs,
  mapFunctions,
  checkDependencies,
  getPropertyDeclarations,
  isNotAGraph,
} from './ASTFunctions';
import type { PathResolver } from '../framework/pathResolver';

export function create(
  context: RuleContext<'unresolved-provider-dependencies', []>,
  pathResolver: PathResolver,
) {
  const imports: TSESTree.ImportDeclaration[] = [];
  const dependencies: string[] = [];

  return {
    ImportDeclaration(node: TSESTree.ImportDeclaration) {
      imports.push(node);
    },
    ClassDeclaration(node: TSESTree.ClassDeclaration) {
      if (isNotAGraph(node.decorators)) return;

      dependencies.push(
        ...getDependenciesFromSubgraphs(imports, getSubGraphs(node.decorators), context, pathResolver),
        ...mapFunctions(node),
        ...getPropertyDeclarations(node),
      );

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
    },
  };
}
