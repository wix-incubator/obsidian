import { hasGraphDecorator } from "./decorators";
import { Graph } from "../dto/graph";
import { Node } from "ts-morph";
import { isClassDeclaration } from "./tsMorph";
import { ProjectAdapter } from "../services/ast/project";

export function getParentGraphRecursive(project: ProjectAdapter, node: Node | undefined): Graph | undefined {
  if (!node) return undefined;
  if (isClassDeclaration(node) && hasGraphDecorator(node)) return new Graph(project, node);
  return getParentGraphRecursive(project, node.getParent());
}
