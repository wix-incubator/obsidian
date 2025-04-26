import { InitializeParams, InitializeResult } from "vscode-languageserver";
import { Logger } from "../../services/logger";

const INCREMENTAL_UPDATE = 1;

export class InitializeCommand {
  constructor (private logger: Logger) { }

  public onInitialize(params: InitializeParams): InitializeResult {
    this.logger.debug('Obsidian Language Server initialized');
    return {
      capabilities: {
        definitionProvider: true,
        textDocumentSync: {
          openClose: true,
          change: INCREMENTAL_UPDATE
        }
      }
    };
  }
}
