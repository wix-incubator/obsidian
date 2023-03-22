module.exports = {
  rules: {
    "decoratorCheck": {
      meta: {
        docs: {
          description: "Enforce consistent position of TypeScript decorators",
          category: "Stylistic Issues",
          recommended: true
        },
        schema: []
      },
      create: function (context: any) {
        const sourceCode = context.getSourceCode();
        return {
          Decorator(node: any) {
            const nextToken = sourceCode.getTokenAfter(node);
            const prevToken = sourceCode.getTokenBefore(node);
            if (
              nextToken &&
              nextToken.value === "@" &&
              prevToken &&
              prevToken.value === " "
            ) {
              context.report({
                node,
                message: "Unexpected space before decorator."
              });
            } else if (
              nextToken &&
              nextToken.value === " " &&
              prevToken &&
              prevToken.value === "@"
            ) {
              context.report({
                node,
                message: "Unexpected space after decorator."
              });
            }
          }
        };
      }
    }
  }
};
