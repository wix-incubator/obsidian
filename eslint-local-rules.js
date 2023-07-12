const TSESTree = require('@typescript-eslint/typescript-estree');
const { ESLint } = require('eslint');
const fs = require('fs');
const path = require('path');
const { parse } = require('@typescript-eslint/parser')

module.exports = {
  'defined-dependencies': {
    meta: {
      docs: {
        description:
          'The dependency must be defined',
        recommended: 'error',
      },
      messages: {
        dependencyUndefined: 'One of the dependencies is undefined {{ dependencyName }}',
      },
      schema: [],
      hasSuggestions: false,
      type: 'suggestion',
    },
    defaultOptions: [],
    create(
      context,
    ) {
      let imports = [];
      let dependencies = [];
      return {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ImportDeclaration(node) {
          imports.push(node);
        },
        ClassDeclaration(node) {
          const decorators = node.decorators;
          if (decorators) {
            const decoratorNames = decorators.map(decorator => getDecoratorName(decorator));
            if (decoratorNames.includes('Graph')) {
              const subGraphs = getSubGraphs(decorators);
              if (subGraphs.length > 0) {
                dependencies.push(...bringDependenciesFromSubgraphs(imports, subGraphs,context));
              }
              dependencies.push(...mapFunctions(node));
              // console.log('dependencies', dependencies);
              const check = checkDependencies(node, dependencies);
              if (!check?.value) {
                context.report({
                  node: node,
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
    },
  },
};
function getSubGraphs(decorator ) {
  const args= decorator[0].expression.arguments;
  if (args) {
    for (let i = 0; i < args.length; i++) {
      if (args[i].type === TSESTree.AST_NODE_TYPES.ObjectExpression) {
        const properties = args[i].properties;
        if (properties) {
          for (let j = 0; j < properties.length; j++) {
            if (properties[j].key.name == 'subgraphs') {
              return properties[j].value.elements.map(subGraph => subGraph.name);
            }
          }
        }
      }
    }
  }
  return [];
}

function bringDependenciesFromSubgraphs(imports, subGraphs, context) {
  const paths=[];
  let dependencies=[];
  imports.forEach(el => {
    el.specifiers.forEach(specifier => {
      if (subGraphs.includes(specifier.local.name)) {
        paths.push({path:el.source.value, import:specifier.local.name});
      }
    });
  });
    paths.forEach(el => {
        const filePath = path.join(path.dirname(context.getFilename()), el.path+'.ts');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const fileAST = parse(fileContent.toString(), 
        {
          filePath,
          useEslintrc: false,
          parserOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            ecmaFeatures: {
              jsx: true,
            },
          },
        }
        );
        dependencies.push(...mapFunctions(fileAST.body[fileAST.body.length-1].declaration));
    });
  return dependencies;
}
function mapFunctions(node) {
  const body = node.body.body;
  const existingDependencies = [];
  body.forEach(el => {
    if (el.type == TSESTree.AST_NODE_TYPES.MethodDefinition) {
      const decorators = (el)?.decorators;
      if (decorators) {
        if (decorators.map(decorator => getDecoratorName(decorator)).includes('Provides')) {
          existingDependencies.push(((el).key).name);
        }
      }
    }
  });
  return existingDependencies;
}
function checkDependencies(node, existingDependencies) {
  const body = node?.body?.body;
  for (let j = 0; j < body.length; j++) {
    if (body[j].type == TSESTree.AST_NODE_TYPES.MethodDefinition && body[j].key.name != 'constructor') {
      const params = (body[j])?.value?.params;
      if (params) {
        for (let i = 0; i < params.length; i++) {
          console.log('param',(params[i]).name );
          if (!existingDependencies.includes((params[i]).name))
            {return {
              value: false,
              param: params[i].name,
            };}
        }
      }
    }
  }
  return { value: true };
}
function getDecoratorName(decorator) {
  return ((decorator?.expression)?.callee)?.name;
}

// const definedDependencies = require('./dist/eslint/rules/definedDependencies/definedDependencies');

// module.exports = {
//     rules: {
//         'definedDependencies': {
//             create:definedDependencies,
//         },
//     },
// };


