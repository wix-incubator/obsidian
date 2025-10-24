export class DedupeSet<T = string> {
  private set = new Set<T>();

  public dedupe = (item: T) => {
    if (this.set.has(item)) {
      return false;
    }
    this.set.add(item);
    return true;
  };
}
