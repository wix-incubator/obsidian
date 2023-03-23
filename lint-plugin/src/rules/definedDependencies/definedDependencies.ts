import { TSESTree } from "@typescript-eslint/typescript-estree";
import { TSESLint } from "@typescript-eslint/utils";
import { createRule } from "../../utils/createRule";

export const ruleName = 'definedDependencies';
export type MessageIds = 'dependencyUndefined';
export type options = [];

const rule = createRule({
  name: ruleName,
  meta: {
    docs: {
      description:
        "The dependency must be defined",
      recommended: 'error',
    },
    messages: {
      dependencyUndefined: `On of the dependencies is undefined`,
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
        if (node?.body?.body) {
          context.report({
            node: node,
            messageId: "dependencyUndefined",
          });
        }
      },
    };
  },
});

export default rule;
