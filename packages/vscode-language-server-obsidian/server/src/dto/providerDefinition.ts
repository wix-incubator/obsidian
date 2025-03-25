import { TextDocument } from "vscode-languageserver-textdocument";
import { Provider } from "./provider";
import { Definition } from "./definition";

export class ProviderDefinition {
  constructor(private document: TextDocument, private provider: Provider) { }

  public get json() {
    return new Definition(this.document, this.provider.getRange(this.document)).json;
  }
}