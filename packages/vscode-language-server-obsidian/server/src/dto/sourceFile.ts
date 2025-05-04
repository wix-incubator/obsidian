import { SourceFile as TsMorphSourceFile } from "ts-morph";
import { Position } from "vscode-languageserver";

export class SourceFile {
  constructor (private sourceFile: TsMorphSourceFile) { }

  public get filePath() {
    return this.sourceFile.getFilePath();
  }

  public getNodeAtPosition($position: Position) {
    const position = this.sourceFile.compilerNode.getPositionOfLineAndCharacter(
      $position.line,
      $position.character
    );
    return this.sourceFile.getDescendantAtPos(position);
  }
}