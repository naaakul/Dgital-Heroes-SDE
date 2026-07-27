import { CacheService } from "./cache";

type CacheEntry = {
  value: unknown;
  expiresAt: number;
};

export class MemoryCache implements CacheService {
  private cache = new Map<string, CacheEntry>();

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);

    if (!item) return null;

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return item.value as T;
  }

  async set<T>(
    key: string,
    value: T,
    ttl: number
  ) {
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttl * 1000,
    });
  }
}