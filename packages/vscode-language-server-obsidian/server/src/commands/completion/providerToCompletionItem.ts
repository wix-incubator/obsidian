import { CompletionItem, CompletionItemKind, InsertTextFormat } from "vscode-languageserver";
import { Provider } from "../../dto/provider";

export function providerToCompletionItem(provider: Provider): CompletionItem {
  return {
    label: provider.name,
    kind: getKind(provider),
    insertText: `${provider.name}: ${provider.type}`,
    insertTextFormat: InsertTextFormat.Snippet,
    detail: `(${provider.kind}) ${provider.name}: ${provider.type}`,
  };
}

function getKind(provider: Provider): CompletionItemKind {
  if (provider.kind === "class") return CompletionItemKind.Class;
  if (provider.kind === "function") return CompletionItemKind.Function;
  return CompletionItemKind.Value;
}
