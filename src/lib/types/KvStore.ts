export interface KvStore<Options = Record<string, string | number>> {
  get: (key: string) => Promise<string | undefined>;
  put: (key: string, value: string, options?: Options) => Promise<void>;
}
