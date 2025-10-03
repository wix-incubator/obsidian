import { ProjectRegistry } from "ts-morph-utils";
import { SourceFile } from "../../dto/sourceFile";

export class ProjectAdapter {
  constructor (private readonly projectRegistry: ProjectRegistry) { }

  public getSourceFileOrThrow(uri: string): SourceFile {
    const sourceFile = this.projectRegistry.getSourceFileOrThrow(uri);
    return new SourceFile(sourceFile);
  }
}
