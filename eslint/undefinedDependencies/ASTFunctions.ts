import { TSESTree } from '@typescript-eslint/typescript-estree';
import * as fs from 'fs';
import { parse } from '@typescript-eslint/parser';
import path= require('path') ;
import { TSESLint } from '@typescript-eslint/utils';

export type MessageIds = 'undefinedDependency';

export function getSubGraphs(decorators: TSESTree.Decorator[]) {
  const args = (decorators[0].expression as TSESTree.CallExpression).arguments;
  if (args) {
    for (let i = 0; i < args.length; i++) {
      if (args[i].type === TSESTree.AST_NODE_TYPES.ObjectExpression) {
        const { properties } = (args[i] as TSESTree.ObjectExpression);
        if (properties) {
          for (let j = 0; j < properties.length; j++) {
            if (((properties[j] as TSESTree.Property).key as TSESTree.Identifier).name === 'subgraphs') {
              return ((properties[j] as TSESTree.Property).value as TSESTree.ArrayExpression)
                .elements.map((subGraph) => (subGraph as TSESTree.Identifier).name);
            }
          }
        }
      }
    }
  }
  return [];
}

export function getDependenciesFromSubgraphs(
  imports: TSESTree.ImportDeclaration[],
  subGraphs:string[],
  context:Readonly<TSESLint.RuleContext<MessageIds, []>>,
) {
  const paths:Record<string, string>[] = [];
  const dependencies: string[] = [];
  imports.forEach((el) => {
    el.specifiers.forEach((specifier) => {
      if (subGraphs.includes(specifier.local.name)) {
        paths.push({ path: el.source.value, import: specifier.local.name });
      }
    });
  });
  paths.forEach((el) => {
    const filePath = path.join(path.dirname(context.getFilename()), `${el['path']}.ts`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
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
    dependencies.push(...mapFunctions(
      (fileAST.body[fileAST.body.length - 1] as TSESTree.ExportDefaultDeclaration)
        .declaration as TSESTree.ClassDeclaration,
    ));
  });
  return dependencies;
}
export function mapFunctions(node: TSESTree.ClassDeclaration) {
  const { body } = node.body;
  const existingDependencies: string[] = [];
  body.forEach((el) => {
    if (el.type === TSESTree.AST_NODE_TYPES.MethodDefinition) {
      const decorators = (el)?.decorators;
      if (decorators) {
        if (decorators.map((decorator) => getDecoratorName(decorator)).includes('Provides')) {
          existingDependencies.push(((el as TSESTree.MethodDefinition).key as TSESTree.Identifier).name);
        }
      }
    }
  });
  return existingDependencies;
}
export function checkDependencies(node: TSESTree.ClassDeclaration, existingDependencies: string[]) {
  const body = node?.body?.body;
  for (let j = 0; j < body.length; j++) {
    if (body[j].type === TSESTree.AST_NODE_TYPES.MethodDefinition
      && ((body[j] as TSESTree.MethodDefinition).key as TSESTree.Identifier).name !== 'constructor') {
      const params = (body[j] as TSESTree.MethodDefinition).value?.params;
      if (params) {
        for (let i = 0; i < params.length; i++) {
          if (!existingDependencies.includes((params[i] as TSESTree.Identifier).name)) {
            return {
              value: false,
              param: (params[i] as TSESTree.Identifier).name,
            };
          }
        }
      }
    }
  }
  return { value: true };
}
export function getDecoratorName(decorator: TSESTree.Decorator) {
  return ((decorator?.expression as TSESTree.CallExpression)?.callee as TSESTree.Identifier)?.name;
}

export function getPropertyDeclarations(node:TSESTree.ClassDeclaration) {
  const classBody = node.body.body;
  const properties = classBody.map((method) => {
    return ((method as (TSESTree.PropertyDefinition | TSESTree.MethodDefinition)).key as TSESTree.Identifier).name;
  });
  return properties;
}
