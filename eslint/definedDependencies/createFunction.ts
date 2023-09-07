import { TSESTree } from '@typescript-eslint/typescript-estree';

import {
  getSubGraphs,
  getDependenciesFromSubgraphs,
  mapFunctions,
  checkDependencies,
  getDecoratorName,
  getPropertyDeclarations,
} from './ASTFunctions';

export function create(context:any) {
  const imports:TSESTree.ImportDeclaration[] = [];
  const dependencies:string[] = [];

  return {
    ImportDeclaration(node:TSESTree.ImportDeclaration) {
      imports.push(node);
    },
    ClassDeclaration(node:TSESTree.ClassDeclaration) {
      const { decorators } = node;
      if (decorators) {
        const decoratorNames = decorators.map((decorator) => getDecoratorName(decorator));
        if (decoratorNames.includes('Graph')) {
          const subGraphs = getSubGraphs(decorators);
          if (subGraphs.length > 0) {
            dependencies.push(...getDependenciesFromSubgraphs(imports, subGraphs, context));
          }
          dependencies.push(...mapFunctions(node));
          dependencies.push(...getPropertyDeclarations(node));
          // const dependencies = createFullDependencyList(decorators, node, imports, context);
          const check = checkDependencies(node, dependencies);
          if (!check?.value) {
            context.report({
              node,
              messageId: 'dependencyUndefined',
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

// function createFullDependencyList(
//   decorators:TSESTree.Decorator[],
//   node:any,
//   imports:any,
//   context:any,
// ) {
//   const dependencies:string[] = [];
//   const subGraphs = getSubGraphs(decorators);
//   if (subGraphs.length > 0) {
//     dependencies.push(...bringDependenciesFromSubgraphs(imports, subGraphs, context));
//   }
//   dependencies.push(...mapFunctions(node));
//   dependencies.push(...getPropertyDeclarations(node));
//   return dependencies;
// }
