import { Client, cacheExchange, fetchExchange } from '@urql/svelte';
import { PUBLIC_API_URL } from '$env/static/public';

export const client = new Client({
  url: PUBLIC_API_URL,
  exchanges: [cacheExchange, fetchExchange]
});
