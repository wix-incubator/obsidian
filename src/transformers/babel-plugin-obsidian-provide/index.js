/* eslint-disable no-param-reassign */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const helpers = require('./helpers');

module.exports = () => {
  const internalVisitor = {
    ClassMethod: {
      enter({ node }) {
        const decorator = helpers.getProviderDecorator(node.decorators);
        if (helpers.getDecoratorName(decorator) === 'Provides') {
          convertProviderParamsToDestructuringAssignment(node);
          saveUnmangledMethodNameInProviderArguments(node, decorator);
        }
      },
    },
  };

  function convertProviderParamsToDestructuringAssignment(node) {
    node.params.fill(helpers.paramsToDestructuringAssignment(node.params));
  }

  function saveUnmangledMethodNameInProviderArguments(node, decorator) {
    if (helpers.providerIsNotNamed(decorator)) {
      helpers.addNameToProviderArguments(node, decorator);
    }
  }

  return {
    name: 'babel-plugin-obsidian-provide',
    visitor: {
      Program(path) {
        path.traverse(internalVisitor);
      },
    },
  };
};
