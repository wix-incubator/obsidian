import { Node } from "ts-morph";
import { Definition } from "vscode-languageserver/node";
import { Logger } from "../../services/logger";

export function createDefinition(logger: Logger, node: Node): Definition {
  logger.debug(`✅ creating definition for:\n ${node.getText()}`);
  return {
    uri: node.getSourceFile().getFilePath(),
    range: {
      start: {
        line: node.getSourceFile().getLineAndColumnAtPos(node.getStart()).line - 1,
        character: node.getSourceFile().getLineAndColumnAtPos(node.getStart()).column - 1
      },
      end: {
        line: node.getSourceFile().getLineAndColumnAtPos(node.getEnd()).line - 1,
        character: node.getSourceFile().getLineAndColumnAtPos(node.getEnd()).column - 1
      }
    }
  };
}
