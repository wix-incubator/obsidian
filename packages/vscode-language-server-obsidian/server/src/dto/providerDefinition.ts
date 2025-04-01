import { TextDocument } from "vscode-languageserver-textdocument";
import { Provider } from "./provider";
import { Definition } from "./definition";
import { SourceFileCreator } from "../services/sourceFileCreator";

export class ProviderDefinition {
  constructor(private document: TextDocument, private provider: Provider, private sourceFileCreator: SourceFileCreator) { }

  public get json() {
    const sourceFile = this.sourceFileCreator.create(this.document);
    return new Definition(this.document, this.provider.getRange(sourceFile)).json;
  }
}