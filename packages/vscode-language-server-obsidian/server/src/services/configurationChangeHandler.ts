import { Connection, DidChangeConfigurationParams } from "vscode-languageserver";
import { Logger, TraceLevel } from "./logger";


export class ConfigurationChangeHandler {
  constructor (private connection: Connection, private logger: Logger) { }

  async handle(event: DidChangeConfigurationParams): Promise<void> {
    this.logger.debug(`Configuration changed ${JSON.stringify(event)}`);
    await this.updateConfiguration(event);
  }

  private async updateConfiguration(event: DidChangeConfigurationParams): Promise<void> {
    const settings = event.settings.obsidianLanguageServer.trace.server as TraceLevel;
    this.logger.setTraceLevel(settings);
  }
} 