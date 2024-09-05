import type { TSESTree } from '@typescript-eslint/types';
import type { CallExpression } from '../../dto/callExpression';
import { requireProgram } from '../../utils/ast';
import { File } from '../../dto/file';
import type { ErrorReporter } from './result/errorReporter';
import type { Identifier } from '../../dto/identifier';
import type { TypeValidator } from './typeValidator';

export class InjectComponentHandler {
  constructor(private typeValidator: TypeValidator, private errorReporter: ErrorReporter) { }

  public handle(callExpression: CallExpression) {
    if (callExpression.isExpression('injectComponent')) {
      const injectedComponent = this.getInjectedComponent(callExpression.node, callExpression.arguments);
      const result = this.typeValidator.validate(injectedComponent, callExpression.generics);
      this.errorReporter.report(result, callExpression.node);
    }
  }

  private getInjectedComponent(node: TSESTree.CallExpression, args: Identifier[]) {
    return new File(requireProgram(node))
      .variables
      .filter(variable => variable.isArrowFunction)
      .find(variable => variable.name === args[0].name);
  }
}
