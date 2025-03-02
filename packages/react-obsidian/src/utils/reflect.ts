import { getGlobal } from './getGlobal';
import { GlobalReflect } from './globalReflect';

const metadataStore = getStore();

export const Reflect = {
  defineMetadata,
  getMetadata,
  hasMetadata,
  get: GlobalReflect.get,
  set: GlobalReflect.set,
  construct: GlobalReflect.construct,
};

function defineMetadata(key: string, value: any, target: any) {
  let metadata = metadataStore.get(target);

  if (!metadata) {
    metadata = {};
    metadataStore.set(target, metadata);
  }

  metadata[key] = value;
}

function getMetadata(key: string, target: any) {
  const metadata = metadataStore.get(target);
  return metadata ? metadata[key] : undefined;
}

function hasMetadata(key: string, target: any) {
  const metadata = metadataStore.get(target);
  return metadata ? metadata[key] !== undefined : false;
}

function getStore(): WeakMap<any, any> {
  const global = getGlobal();
  global.obsidianMetadataStore = global.obsidianMetadataStore || new WeakMap();
  return global.obsidianMetadataStore;
}
