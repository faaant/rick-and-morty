import type { KvStore } from '$lib/types/KvStore';

export const isKvStore = (entity: unknown): entity is KvStore => {
  if (!entity || typeof entity !== 'object') {
    return false;
  }

  return 'get' in entity && 'put' in entity;
};
