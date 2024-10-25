import { ClassMethod, Decorator } from '@swc/types';
import {
  addNameToProviderArguments,
  getDecoratorName,
  getDecoratorByName,
  paramsToDestructuringAssignment,
  providerIsNotNamed,
} from '../helpers';

function saveMethod(name: string, node: ClassMethod) {

  const decorator = getDecoratorByName(node.function.decorators, name);
  if (getDecoratorName(decorator) === name) {
    convertProviderParamsToDestructuringAssignment(node);
    saveUnmangledMethodNameInProviderArguments(node, decorator!);
  }
}

function convertProviderParamsToDestructuringAssignment(node: ClassMethod) {
  if (node.function.params.length === 0) { return; }
  const destructuredParams = paramsToDestructuringAssignment(node.function.params);
  // eslint-disable-next-line no-param-reassign
  node.function.params.length = 0;
  node.function.params.push(destructuredParams);
}

function saveUnmangledMethodNameInProviderArguments(node: ClassMethod, decorator: Decorator) {
  if (providerIsNotNamed(decorator)) {
    addNameToProviderArguments(node, decorator);
  }
}
export default saveMethod;
