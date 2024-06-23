import { TSESTree } from '@typescript-eslint/types';
import * as fs from 'fs';
import { parse } from '@typescript-eslint/parser';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';
import { PathResolver } from '../framework/pathResolver';
import { ClassDeclaration } from '../dto/classDeclaration';
import type { Decorator } from '../dto/decorator';
import { File } from '../dto/file';

export type MessageIds = 'unresolved-provider-dependencies';

export function getSubGraphs({decorators}: ClassDeclaration) {
  const properties = getGraphDecoratorProperties(decorators);
  for (let j = 0; j < properties.length; j++) {
    if (((properties[j] as TSESTree.Property).key as TSESTree.Identifier).name === 'subgraphs') {
      return ((properties[j] as TSESTree.Property).value as TSESTree.ArrayExpression)
        .elements.map((subGraph: any) => (subGraph as TSESTree.Identifier).name);
    }
  }
  return [];
}

function getGraphDecoratorProperties(decorators: Decorator[]) {
  const graph = decorators.find((decorator) => {
    const callee = (decorator.expression as TSESTree.CallExpression).callee as TSESTree.Identifier;
    return callee.name === 'Graph';
  });
  const graphArguments = (graph?.expression as TSESTree.CallExpression)?.arguments[0] as TSESTree.ObjectExpression;
  return graphArguments?.properties || [];
}

export function getDependenciesFromSubgraphs(
  clazz: ClassDeclaration,
  imports: TSESTree.ImportDeclaration[],
  subGraphs: string[],
  context: RuleContext<'unresolved-provider-dependencies', []>,
  pathResolver: PathResolver,
) {
  const paths: {path: string; import: string}[] = [];
  const dependencies: string[] = [];
  imports.forEach((el) => {
    el.specifiers.forEach((specifier) => {
      if (subGraphs.includes(specifier.local.name)) {
        paths.push({ path: el.source.value, import: specifier.local.name });
      }
    });
  });

  // Find dependencies in graphs that are declared in the same file
  const unimportedGraphs = subGraphs.filter(
    subgraph => paths.find(p => p.import === subgraph) === undefined,
  );
  const file = new File(clazz.node.parent as TSESTree.Program);
  unimportedGraphs.forEach((subgraph) => {
    const graph = file.findGraph(subgraph);
    if (graph) {
      dependencies.push(...mapFunctions(new ClassDeclaration(graph)));
    }
  });

  paths.forEach((el) => {
    const filePath = pathResolver.resolve(context, el.path);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    const fileAST = parse(
      fileContent,
      {
        ecmaVersion: 9,
        ecmaFeatures: {
          globalReturn: false,
          jsx: true,
        },
        sourceType: 'module',
        comment: true,
        attachComment: true,
        tokens: true,
        loc: true,
        range: true,
        filePath,
      },
    );

    const clazz2 = (fileAST.body[fileAST.body.length - 1] as TSESTree.ExportDefaultDeclaration)
      .declaration as TSESTree.ClassDeclaration;
    dependencies.push(...mapFunctions(new ClassDeclaration(clazz2)));
  });
  return dependencies;
}
export function mapFunctions({body}: ClassDeclaration) {
  const existingDependencies: string[] = [];
  body.forEach((el: any) => {
    if (el.type === TSESTree.AST_NODE_TYPES.MethodDefinition) {
      const decorators = (el)?.decorators;
      if (decorators) {
        if (decorators.map((decorator: any) => getDecoratorName(decorator)).includes('Provides')) {
          existingDependencies.push(((el as TSESTree.MethodDefinition).key as TSESTree.Identifier).name);
        }
      }
    }
  });
  return existingDependencies;
}
export function checkDependencies({body}: ClassDeclaration, dependencies: string[]) {
  for (let j = 0; j < body.length; j++) {
    if (body[j].type === TSESTree.AST_NODE_TYPES.MethodDefinition
      && ((body[j] as TSESTree.MethodDefinition).key as TSESTree.Identifier).name !== 'constructor') {
      const params = (body[j] as TSESTree.MethodDefinition).value?.params;
      if (params) {
        for (let i = 0; i < params.length; i++) {
          if (!dependencies.includes((params[i] as TSESTree.Identifier).name)) {
            return {
              error: true,
              param: (params[i] as TSESTree.Identifier).name,
              node: params[i],
            };
          }
        }
      }
    }
  }
  return { error: false };
}
export function getDecoratorName(decorator: TSESTree.Decorator) {
  return ((decorator?.expression as TSESTree.CallExpression)?.callee as TSESTree.Identifier)?.name;
}

export function getPropertyDeclarations({body}: ClassDeclaration) {
  const properties = body.map((method: any) => {
    return ((method as (TSESTree.PropertyDefinition | TSESTree.MethodDefinition)).key as TSESTree.Identifier).name;
  });
  return properties;
}
