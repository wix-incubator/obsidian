import type { Context } from '../../dto/context';
import type { CallExpression } from '../../dto/callExpression';
import { requireProgram } from '../../utils/ast';
import { File } from '../../dto/file';
import { FunctionalComponent } from '../../dto/functionalComponent';

export class InjectComponentHandler {
  constructor(private context: Context) { }

  public handle(callExpression: CallExpression) {
    if (this.isInjectComponentCall(callExpression)) {
      const injectedComponent = this.getFile(callExpression)
        .variables
        .filter((variable) => variable.isArrowFunction)
        .find((variable) => variable.name === this.getInjectedComponentName(callExpression));

        if (injectedComponent) {
          const functionalComponent = new FunctionalComponent(injectedComponent.arrowFunction);
          const {propsType} = functionalComponent;

          console.log(propsType);
          console.log(callExpression.generics.types);

          if (propsType !== callExpression.generics.types) {
            // TODO: report error
          }
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