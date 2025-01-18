import type { Character, Episode } from '$lib/graphql/schema-types';

export type InputEpisode =
  | (Pick<Episode, 'id' | 'name' | 'episode'> & {
      characters?: (Pick<Character, 'id' | 'name' | 'image'> | null)[];
    })
  | null;
