import * as path from 'path';
import { workspace, ExtensionContext, window, OutputChannel } from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;
let outputChannel: OutputChannel;

export function activate(context: ExtensionContext) {
  // Create output channel
  outputChannel = window.createOutputChannel('Obsidian Language Server');

  const serverModule = context.asAbsolutePath(
    path.join('server', 'dist', 'server.js')
  );

  const serverOptions: ServerOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: {}
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: {
        execArgv: ['--nolazy', '--inspect=6009'],
      }
    }
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: 'file', language: 'typescript' },
      { scheme: 'file', language: 'typescriptreact' }
    ],
    outputChannel: outputChannel,
    traceOutputChannel: outputChannel
  };

  client = new LanguageClient(
    'obsidianLanguageServer',
    'Obsidian',
    serverOptions,
    clientOptions
  );

  // Start the client and launch the server
  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
} 