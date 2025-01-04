import { getGlobal } from './getGlobal';

function getStore(): WeakMap<any, any> {
  const global = getGlobal();
  global.__metadataStore = global.__metadataStore || new WeakMap();
  return global.__metadataStore;
}

const metadataStore = getStore();

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

export function hasMetadata(target: any, key: string) {
  const metadata = metadataStore.get(target);
  return metadata ? metadata[key] !== undefined : false;
}
