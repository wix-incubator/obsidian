import { TextDocument } from "vscode-languageserver-textdocument";

export function createDocument(source: string, uri: string = 'test.ts') {
  return TextDocument.create(uri, 'typescript', 1, source);
}
