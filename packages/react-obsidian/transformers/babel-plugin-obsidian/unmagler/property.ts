import { Decorator } from '@babel/types';
import {
  getDecoratorName,
  getDecoratorByName,
  passParamNameAsInjectArgument,
  AcceptedNodeType,
  getDecoratorStringArgument,
} from '../helpers';

function savePropertyName(name: string, node: AcceptedNodeType) {
  const decorator = getDecoratorByName(node.decorators, name);
  if ((getDecoratorName(decorator) === name) && injectIsNotNamed(decorator!)) {
    passParamNameAsInjectArgument(node, decorator!);
  }
}

function injectIsNotNamed(decorator: Decorator): boolean {
  return getDecoratorStringArgument(decorator) === undefined;
}

export default savePropertyName;
