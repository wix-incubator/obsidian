export default class GraphProperties {
  private unmangledToMangledPropKeys = new Map<string, string>();

  add(mangledPropertyKey: string, unmangledPropertyKey: string) {
    this.unmangledToMangledPropKeys.set(unmangledPropertyKey, mangledPropertyKey);
  }

  getMangledProperty(unmangledProperty: string): string | undefined {
    return this.unmangledToMangledPropKeys.get(unmangledProperty);
  }

  getMangledProperties(): string[] {
    return Array.from(this.unmangledToMangledPropKeys.values());
  }
}
