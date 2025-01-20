declare global {
  namespace App {
    interface Platform {
      env: {
        KV_STORE: KVNamespace;
      };
    }
  }
}

export {};
