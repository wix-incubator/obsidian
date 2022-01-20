import { ClassMethod, Decorator } from '@babel/types';
import {
  addNameToProviderArguments,
  getDecoratorName,
  getDecoratorByName,
  paramsToDestructuringAssignment,
  providerIsNotNamed,
} from '../helpers';

function saveMethod(name: string, node: ClassMethod) {
  const decorator = getDecoratorByName(node.decorators, name);
  if (getDecoratorName(decorator) === name) {
    convertProviderParamsToDestructuringAssignment(node);
    saveUnmangledMethodNameInProviderArguments(node, decorator!);
  }
}

function convertProviderParamsToDestructuringAssignment(node: ClassMethod) {
  if (node.params.length === 0) { return; }
  const destructuredParams = paramsToDestructuringAssignment(node.params);
  // eslint-disable-next-line no-param-reassign
  node.params.length = 0;
  node.params.push(destructuredParams);
}

function saveUnmangledMethodNameInProviderArguments(node: ClassMethod, decorator: Decorator) {
  if (providerIsNotNamed(decorator)) {
    addNameToProviderArguments(node, decorator);
  }
}
export default saveMethod;
