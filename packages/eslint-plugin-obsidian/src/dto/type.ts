export interface Type {
  toString(): string[];
  isEmpty(): boolean;
  equals(types: Type[]): boolean;
}