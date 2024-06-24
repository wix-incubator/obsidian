import { TSESTree } from '@typescript-eslint/types';
import { Clazz } from '../dto/class';
import { Decorator } from '../dto/decorator';

export function checkDependencies({ body }: Clazz, dependencies: string[]) {
  for (let j = 0; j < body.length; j++) {
    if (body[j].type === TSESTree.AST_NODE_TYPES.MethodDefinition
      && ((body[j] as TSESTree.MethodDefinition).key as TSESTree.Identifier).name !== 'constructor') {
      // Check if the method is decorated with @Provides
      const { decorators } = (body[j] as TSESTree.MethodDefinition);
      const hasProvidesDecorator = decorators?.some($decorator => {
        const decorator = new Decorator($decorator);
        return decorator.expression.callee.type === TSESTree.AST_NODE_TYPES.Identifier &&
        decorator.expression.callee.name === 'Provides';
      });

      if (hasProvidesDecorator) {
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
  }
  return { error: false };
}
