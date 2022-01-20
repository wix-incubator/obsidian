import { Identifier, Decorator, TSParameterProperty } from '@babel/types';
import {
  getDecoratorName,
  getDecoratorByName,
  passParamNameAsInjectArgument,
  getDecoratorArgument,
} from '../helpers';

function savePropertyName(name: string, node: Identifier | TSParameterProperty) {
  const decorator = getDecoratorByName(node.decorators, name);
  if (getDecoratorName(decorator) === name && injectIsNotNamed(decorator!)) {
    passParamNameAsInjectArgument(node, decorator!);
  }
}

function injectIsNotNamed(decorator: Decorator): boolean {
  return getDecoratorArgument(decorator) === undefined;
}

export default savePropertyName;
