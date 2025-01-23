import { client } from '$lib/graphql/client';
import { SearchDocument } from '$lib/graphql/query/Search';
import { prepareCharacter } from '$lib/utils/prepareCharacters';
import { prepareEpisodes } from '$lib/utils/prepareEpisodes';
import { fail, type Actions } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { isKvStore } from '$lib/utils/isKvStore';
import type { KvStore } from '$lib/types/KvStore';
import { RateLimiter } from '$lib/rate-limiter/RateLimiter';

const cfKvStore = env.KV_STORE;
const kvStore: KvStore | undefined = isKvStore(cfKvStore) ? cfKvStore : undefined;
const rateLimiter = new RateLimiter({ interval: 60000, limit: 10 });

export const actions = {
  search: async (event) => {
    const request = event.request;
    const clientIp = event.getClientAddress();

    if (rateLimiter.shouldLimit(clientIp)) {
      return fail(429, { message: 'Too many requests! Please wait a minute and then try again' });
    }

    const formData = await request.formData();
    const phrase = formData.get('phrase');
    if (typeof phrase !== 'string' || phrase.length < 3) {
      return fail(400, { message: 'Search phrase should has at least 3 symbols' });
    }

    const cachedValue = await kvStore?.get(phrase);
    if (cachedValue) {
      try {
        return JSON.parse(cachedValue);
      } catch {
        console.error(`Can't parse cached value for key "${phrase}."`);
      }
    }

    const { data, error } = await client.query(SearchDocument, { name: phrase });

    if (error) {
      return fail(error.response?.status ?? 500, { message: error.message });
    }

    const characters =
      data?.characters?.results?.length && data.characters.results.map(prepareCharacter);
    const episodes = data?.episodes?.results?.length && prepareEpisodes(data.episodes.results);

    if (!characters && !episodes) {
      return fail(404, { message: 'No data found' });
    }

    const responseData = { characters, episodes };
    await kvStore?.put(phrase, JSON.stringify(responseData), { expirationTtl: 300 });

    return responseData;
  }
} satisfies Actions;
