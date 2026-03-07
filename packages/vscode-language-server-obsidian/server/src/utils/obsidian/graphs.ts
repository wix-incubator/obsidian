import { Graph } from "ts-morph-extensions";
import { Node } from "ts-morph";
import { ProjectAdapter } from "../../services/projectAdapter";

export function getParentGraphRecursive(project: ProjectAdapter, node: Node | undefined): Graph | undefined {
  if (!node) return undefined;
  if (Node.isClassDeclaration(node)) return new Graph(node);
  return getParentGraphRecursive(project, node.getParent());
}
