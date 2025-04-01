import { TextDocument } from "vscode-languageserver-textdocument";
import { Provider } from "./provider";

type Range = ReturnType<Provider["getRange"]>;

export class Definition {
  constructor(private document: TextDocument, private range: Range) { }

  public get json() {
    return {
      uri: this.document.uri,
      range: this.range
    };
  }
}