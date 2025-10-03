export interface Logger {
  info(message: string): void;
  error(message: string, error?: Error): void;
  warn(message: string): void;
  debug(message: string): void;
}

export class NoOpLogger implements Logger {
  info(message: string): void {
    // No-op
  }

  error(message: string, error?: Error): void {
    // No-op
  }

  warn(message: string): void {
    // No-op
  }

  debug(message: string): void {
    // No-op
  }
}
