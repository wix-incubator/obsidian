import { Node, SourceFile } from "ts-morph";
import { Definition } from "vscode-languageserver/node";
import { Logger } from "../../services/logger";

export function createDefinition(
  logger: Logger,
  sourceFile: SourceFile,
  node: Node,
): Definition {
  logger.debug(`✅ creating definition for:\n ${node.getText()}`);
  return {
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
}
