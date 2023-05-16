import { TSESTree } from "@typescript-eslint/typescript-estree";
import { TSESLint } from "@typescript-eslint/utils";
import { Decorator, MethodDefinition, Identifier } from "@typescript-eslint/types/dist/generated/ast-spec";
import { createRule } from "../../utils/createRule";

export const ruleName = 'definedDependencies';
export type MessageIds = 'dependencyUndefined';
export type options = [];

function mapFunctions(node: TSESTree.ClassDeclaration) {
  const body = node.body.body;
  const existingDependencies: string[] = [];
  body.forEach(el => {
    if (el.type = TSESTree.AST_NODE_TYPES.MethodDefinition) {
      const decorators = (el as MethodDefinition)?.decorators;
      if (decorators) {
        if (decorators.map(decorator => getDecoratorName(decorator)).includes('Provides')) {
          existingDependencies.push(((el as MethodDefinition).key as Identifier).name);
        }
      }
    }
  });
  return existingDependencies;
}
function checkDependencies(node: TSESTree.ClassDeclaration, existingDependencies: string[]) {
  const body = node.body.body;
  for (let j = 0; j < body.length;j++){
    if (body[j].type == TSESTree.AST_NODE_TYPES.MethodDefinition
      && ((body[j] as MethodDefinition).key as Identifier).name !='constructor') {
      const params = (body[j] as MethodDefinition).value.params;
      if (params) {
        for (let i = 0; i < params.length; i++){
          if (!existingDependencies.includes((params[i] as Identifier).name))
            return {
              value: false,
              param: params[i]
            }
        }
      }
    }
  };
  return {value:true}
}
function getDecoratorName(decorator: Decorator) {
  return ((decorator?.expression as TSESTree.CallExpression)?.callee as Identifier)?.name;
}

const rule = createRule({ 
  name: ruleName,
  meta: {
    docs: {
      description:
        "The dependency must be defined",
      recommended: 'error',
    },
    messages: {
      dependencyUndefined: 'One of the dependencies is undefined {{ dependencyName }}',
    },
    schema: [],
    hasSuggestions: false,
    type: "suggestion",
  },
  defaultOptions: [],

  create(
    context: Readonly<TSESLint.RuleContext<MessageIds, []>>
  ) {
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ClassDeclaration(node: TSESTree.ClassDeclaration): void {
        const decorators = node.decorators;
        if (decorators) {
          const decoratorNames = decorators.map(decorator => getDecoratorName(decorator));
          if (decoratorNames.includes('Graph')) {
            const functions = mapFunctions(node);
            const check: any = checkDependencies(node, functions);
            if (!check?.value) {
              context.report({
                node: node,
                messageId: "dependencyUndefined",
                data: {
                  dependencyName: check.param,
                }
              });
            }}

        }
      },
    };
  },
});

export default rule;


