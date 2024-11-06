export interface Type {
  toString(): string[];
  isEmpty(): boolean;
  equals(types: Type[]): boolean;
  includes(type: Type[]): boolean;
  size(): number;
}
