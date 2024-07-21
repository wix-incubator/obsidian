import type { TSESTree } from '@typescript-eslint/types';
import type { CallExpression } from '../../dto/callExpression';
import { requireProgram } from '../../utils/ast';
import { File } from '../../dto/file';
import type { ErrorReporter } from './errorReporter';
import type { Identifier } from '../../dto/identifier';
import type { TypeValidator } from './typeValidator';

export class InjectComponentHandler {
  constructor(private errorReporter: ErrorReporter, private typeValidator: TypeValidator) { }

  public handle(callExpression: CallExpression) {
    if (callExpression.isExpression('injectComponent')) {
      const injectedComponent = this.getInjectedComponent(callExpression.node, callExpression.arguments);
      const { isError, componentProps } = this.typeValidator.validate(injectedComponent, callExpression.generics);
      if (isError) this.errorReporter.report(componentProps, callExpression.node);
    }
  }

  private getInjectedComponent(node: TSESTree.CallExpression, args: Identifier[]) {
    return new File(requireProgram(node))
      .variables
      .filter((variable) => variable.isArrowFunction)
      .find((variable) => variable.name === args[0].name);
  }
}