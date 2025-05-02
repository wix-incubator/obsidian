import { DidChangeConfigurationParams } from "vscode-languageserver";
import { Logger, TraceLevel } from "../../services/logger";


export class ConfigurationChangeHandler {
  constructor (private logger: Logger) { }

  async handle(event: DidChangeConfigurationParams): Promise<void> {
    this.logger.debug(`Configuration changed ${JSON.stringify(event)}`);
    await this.updateConfiguration(event);
  }

  private async updateConfiguration(event: DidChangeConfigurationParams): Promise<void> {
    const settings = event.settings.obsidianLanguageServer.trace.server as TraceLevel;
    this.logger.setTraceLevel(settings);
  }
} 