class ProvidedPropertiesStore {
  private readonly values: Map<string, Set<string>> = new Map();

  get(_class: any): Array<string> {
    const propertyKeys = this.values.get(_class.constructor.name);
    return propertyKeys ? Array.from(propertyKeys) : [];
  }

  set(_class: any, propertyKey: string) {
    const className = _class.constructor.name;
    let propertyKeysSet = this.values.get(className);
    if (!propertyKeysSet) {
      propertyKeysSet = new Set();
    }
    propertyKeysSet.add(propertyKey);
    this.values.set(className, propertyKeysSet);
  }

  clear(_class: any) {
    this.values.delete(_class.constructor.name);
  }
}

export default new ProvidedPropertiesStore();
