import { isEmpty } from 'lodash';
import type { CallExpression } from '../../dto/callExpression';
import { requireProgram } from '../../utils/ast';
import { File } from '../../dto/file';
import { FunctionalComponent } from '../../dto/functionalComponent';
import type { ErrorReporter } from './errorReporter';
import { equals } from '../../utils/array';

export class InjectComponentHandler {
  constructor(private errorReporter: ErrorReporter) { }

  public handle(callExpression: CallExpression) {
    if (this.isInjectComponentCall(callExpression)) {
      const injectedComponent = this.getFile(callExpression)
        .variables
        .filter((variable) => variable.isArrowFunction)
        .find((variable) => variable.name === this.getInjectedComponentName(callExpression));

      if (injectedComponent) {
        const functionalComponent = new FunctionalComponent(injectedComponent.arrowFunction);
        const componentProps = functionalComponent.propsType;

        console.log(componentProps);
        console.log(callExpression.generics?.types);

        if (isEmpty(componentProps) || equals(componentProps, callExpression.generics?.types)) return;
        this.errorReporter.report({
          types: componentProps,
          node: callExpression.node,
        });
      }
    }
  }

  private isInjectComponentCall(node: CallExpression) {
    return node.name === 'injectComponent';
  }

  private getInjectedComponentName(node: CallExpression) {
    return node.arguments[0].name;
  }

  private getFile(node: CallExpression) {
    return new File(requireProgram(node.node));
  }
}