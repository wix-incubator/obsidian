import { Provider } from "./provider";
import { Definition } from "vscode-languageserver/node";

// TODO! this abstraction is probably not needed
export class ProviderDefinition {
  constructor(private provider: Provider) { }

  public get asTsCompilerDefinition(): Definition {
    return {
      uri: this.provider.uri,
      range: {
        start: {
          line: this.provider.getRange().start.line,
          character: this.provider.getRange().start.column - 1
        },
        end: {
          line: this.provider.getRange().end.line,
          character: this.provider.getRange().end.column
        }
      }
    }
  }
}
