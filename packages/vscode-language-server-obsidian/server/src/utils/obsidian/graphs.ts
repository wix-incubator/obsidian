import { hasGraphDecorator } from "../ts/decorators";
import { Graph } from "../../dto/graph";
import { Node } from "ts-morph";
import { ProjectAdapter } from "../../services/project/projectAdapter";

export function getParentGraphRecursive(project: ProjectAdapter, node: Node | undefined): Graph | undefined {
  if (!node) return undefined;
  if (Node.isClassDeclaration(node) && hasGraphDecorator(node)) return new Graph(project, node);
  return getParentGraphRecursive(project, node.getParent());
}
