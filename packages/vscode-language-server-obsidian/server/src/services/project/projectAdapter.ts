import { ProjectRegistry } from "./projectRegistry";
import { Logger } from "../logger";
import { SourceFile } from "../../dto/sourceFile";

export class ProjectAdapter {
  constructor (private readonly projectRegistry: ProjectRegistry, private readonly logger: Logger) { }

  public getSourceFileOrThrow(uri: string): SourceFile {
    const filePath = uri.startsWith('file://') ? uri.slice(7) : uri;
    const project = this.projectRegistry.get(filePath);
    const sourceFile = project.getSourceFileOrThrow(filePath);
    return new SourceFile(sourceFile);
  }
}
