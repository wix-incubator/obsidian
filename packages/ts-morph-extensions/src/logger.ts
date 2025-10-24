export interface Logger {
  info(message: string): void;
  error(message: string, error?: Error): void;
  warn(message: string): void;
  debug(message: string): void;
}

export class NoOpLogger implements Logger {
  info(_message: string): void {
    // No-op
  }

  error(_message: string, _error?: Error): void {
    // No-op
  }

  warn(_message: string): void {
    // No-op
  }

  debug(_message: string): void {
    // No-op
  }
}

const logger: Logger = new NoOpLogger();
export function setLogger($logger: Logger) {
  (global as any)['tsMorphExtensionsLogger'] = $logger;
}

export function getLogger() {
  return (global as any)['tsMorphExtensionsLogger'] || logger;
}
