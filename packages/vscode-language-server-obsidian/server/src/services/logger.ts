import { Connection } from 'vscode-languageserver/node';

export enum TraceLevel {
  Off = 'off',
  Messages = 'messages',
  Verbose = 'verbose'
}

export class Logger {
  private traceLevel: TraceLevel = TraceLevel.Off;

  constructor (private connection: Connection) { }

  setTraceLevel(level: TraceLevel) {
    this.debug(`Trace level set to ${level}`);
    this.traceLevel = level;
  }

  info(message: string): void {
    if (this.traceLevel !== TraceLevel.Off) {
      this.connection.console.info(message);
    }
  }

  error(message: string, error?: Error): void {
    if (this.traceLevel !== TraceLevel.Off) {
      if (error) {
        this.connection.console.error(message);
        if (error.stack) this.connection.console.error(error.stack);
      } else {
        this.connection.console.error(message);
      }
    }
  }

  warn(message: string): void {
    if (this.traceLevel !== TraceLevel.Off) {
      this.connection.console.warn(message);
    }
  }

  debug(message: string): void {
    if (this.traceLevel === TraceLevel.Verbose) {
      this.connection.console.log(message);
    }
  }
} 