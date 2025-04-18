import { Connection } from 'vscode-languageserver/node';

export class Logger {
  constructor (private connection: Connection) { }

  info(message: string): void {
    this.connection.console.info(message);
  }

  error(message: string, error?: Error): void {
    if (error) {
      this.connection.console.error(message);
      if (error.stack) this.connection.console.error(error.stack);
    } else {
      this.connection.console.error(message);
    }
  }

  warn(message: string): void {
    this.connection.console.warn(message);
  }

  debug(message: string): void {
    this.connection.console.log(message);
  }
} 