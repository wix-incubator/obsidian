import { SourceFile } from "ts-morph";
import { ProjectRegistry } from "./projectRegistry";
import { Logger } from "../logger";

export class ProjectAdapter {
  constructor (
    private readonly projectRegistry: ProjectRegistry,
    private readonly logger: Logger
  ) { }

  public getSourceFile(uri: string) {
    const filePath = uri.startsWith('file://') ? uri.slice(7) : uri;
    this.logger.info(`Getting source file for URI: ${filePath}`);
    const project = this.projectRegistry.get(filePath);
    const sourceFile = project.getSourceFile(filePath);
    this.logResult(sourceFile, filePath);
    return sourceFile;
  }

  private logResult(sourceFile: SourceFile | undefined, filePath: string) {
    if (sourceFile) {
      this.logger.info(`✅ Found source file for URI: ${filePath}`);
    } else {
      this.logger.error(`❌ Source file not found for URI: ${filePath}`);
    }
  }
}
