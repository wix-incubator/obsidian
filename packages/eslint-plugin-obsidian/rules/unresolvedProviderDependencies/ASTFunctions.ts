import { TSESTree } from '@typescript-eslint/types';
import { Clazz } from '../dto/class';

export function checkDependencies({body}: Clazz, dependencies: string[]) {
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
