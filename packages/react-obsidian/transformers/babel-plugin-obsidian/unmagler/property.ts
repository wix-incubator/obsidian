import { Decorator } from '@babel/types';
import {
  getDecoratorName,
  getDecoratorByName,
  passParamNameAsInjectArgument,
  getDecoratorArgument,
  AcceptedNodeType,
} from '../helpers';

function savePropertyName(name: string, node: AcceptedNodeType) {
  const decorator = getDecoratorByName(node.decorators, name);
  if (getDecoratorName(decorator) === name && injectIsNotNamed(decorator!)) {
    passParamNameAsInjectArgument(node, decorator!);
  }
}

function injectIsNotNamed(decorator: Decorator): boolean {
  return getDecoratorArgument(decorator) === undefined;
}

export default savePropertyName;
