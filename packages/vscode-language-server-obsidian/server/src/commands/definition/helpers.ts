import { Node, SourceFile } from "ts-morph";
import { Definition } from "vscode-languageserver/node";

export function createDefinition(sourceFile: SourceFile, node: Node): Definition {
  console.log(`✅ creating definition for:\n ${node.getText()}`);
  const result = {
    uri: sourceFile.getFilePath(),
    range: {
      start: {
        line: sourceFile.getLineAndColumnAtPos(node.getStart()).line - 1,
        character: sourceFile.getLineAndColumnAtPos(node.getStart()).column - 1
      },
      end: {
        line: sourceFile.getLineAndColumnAtPos(node.getEnd()).line - 1,
        character: sourceFile.getLineAndColumnAtPos(node.getEnd()).column - 1
      }
    }
  };
  console.log(`✅ result: ${JSON.stringify(result)}`);
  return result;
}
