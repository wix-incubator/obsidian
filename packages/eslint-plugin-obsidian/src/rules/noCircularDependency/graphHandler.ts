import type { Clazz } from '../../dto/class';
import type { CircularDependenciesDetector } from './circularDependenciesDetector';
import type { ErrorReporter } from './errorReporter';

export class GraphHandler {
  constructor(
    private circularDependenciesDetector: CircularDependenciesDetector,
    private errorReporter: ErrorReporter,
  ) { }

  public handle(clazz: Clazz) {
    if (this.hasGraphDecorator(clazz)) {
      const result = this.circularDependenciesDetector.detect(clazz);
      this.errorReporter.report({ isError: result.hasCircularDependency, ...result });
    }
  }

  private hasGraphDecorator(clazz: Clazz) {
    return clazz.isDecoratedWithIgnoreCase('Graph');
  }
}
