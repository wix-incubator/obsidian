import ts = require("typescript");
import { hasGraphDecorator } from "./decorators";
import { Graph } from "../dto/graph";

export function getParentGraphRecursive(node: ts.Node): Graph | undefined {
    if (!node) return undefined;
    if (ts.isClassDeclaration(node) && hasGraphDecorator(node)) return new Graph(node);
    return getParentGraphRecursive(node.parent);
}
