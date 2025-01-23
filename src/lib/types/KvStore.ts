export interface KvStore {
  get: (key: string) => Promise<string | undefined>;
  put: (key: string, value: string, options?: Record<string, string | number>) => Promise<void>;
}
