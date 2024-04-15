class ReferenceCounter {
  private readonly references = new WeakMap<object, number>();

  retain(object: any) {
    const count = this.references.get(object) ?? 0;
    this.references.set(object, count + 1);
  }

  release<T extends object>(object: T, onReleased: (_object: T) => void) {
    const count = this.references.get(object)!;
    if (count === 1) {
      onReleased(object);
      this.references.delete(object);
    } else {
      this.references.set(object, count - 1);
    }
  }
}

export default new ReferenceCounter();
