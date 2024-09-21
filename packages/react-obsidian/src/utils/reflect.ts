const metadataStore = new WeakMap();

export function defineMetadata(target: any, key: string, value: any) {
  let metadata = metadataStore.get(target);

  if (!metadata) {
    metadata = {};
    metadataStore.set(target, metadata);
  }

  metadata[key] = value;
}

export function getMetadata(target: any, key: string) {
  const metadata = metadataStore.get(target);
  return metadata ? metadata[key] : undefined;
}
