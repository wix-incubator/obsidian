import { Scope } from '@Obsidian';

class ScopedValuesRegistry {
  private readonly values: Map<string, any> = new Map();

  has(scope: Scope, property: string): boolean {
    return this.values.has(scope.toString() + property);
  }

  get(scope: Scope, property: string): any {
    if (this.values.has(scope.toString() + property)) {
      return this.values.get(scope.toString() + property);
    }
    throw new Error(`Property ${property} does not exist`);
  }

  set(scope: Scope, property: string, value: any) {
    this.values.set(scope.toString() + property, value);
  }

  clear(scope: Scope, property: string) {
    this.values.delete(scope.toString() + property);
  }
}

export default new ScopedValuesRegistry();
