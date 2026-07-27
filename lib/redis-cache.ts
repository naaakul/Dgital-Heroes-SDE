import { redis } from "./redis";
import { CacheService } from "./cache";

export class RedisCache implements CacheService {
  async get<T>(key: string): Promise<T | null> {
    return await redis.get<T>(key);
  }

  async set<T>(
    key: string,
    value: T,
    ttl: number
  ): Promise<void> {
    await redis.set(key, value, {
      ex: ttl,
    });
  }
}