import { Node, SourceFile } from "ts-morph";
import { Definition } from "vscode-languageserver/node";

export function createDefinition(sourceFile: SourceFile, node: Node): Definition {
  return {
    uri: sourceFile.getFilePath(),
    range: {
      start: {
        line: sourceFile.getLineAndColumnAtPos(node.getStart()).line - 1,
        character: sourceFile.getLineAndColumnAtPos(node.getStart()).column - 1
      },
      end: {
        line: sourceFile.getLineAndColumnAtPos(node.getEnd()).line,
        character: sourceFile.getLineAndColumnAtPos(node.getEnd()).column
      }
    }
  };
}
