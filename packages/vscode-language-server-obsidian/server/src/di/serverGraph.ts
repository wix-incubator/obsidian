import { ObjectGraph, graph, singleton, provides } from "react-obsidian";
import { Connection, createConnection, ProposedFeatures, TextDocuments } from "vscode-languageserver/node";
import { Logger } from "../services/logger";
import { TextDocument } from "vscode-languageserver-textdocument";


@singleton() @graph()
export class ServerGraph extends ObjectGraph {
  @provides()
  connection(): Connection {
    return createConnection(ProposedFeatures.all);
  }

  @provides()
  logger(connection: Connection) {
    return new Logger(connection);
  }

  @provides()
  documents() {
    return new TextDocuments(TextDocument);
  }
}