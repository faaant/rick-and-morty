import type { Character, Episode } from '$lib/graphql/schema-types';

export type InputCharacter = Pick<
  Character,
  'gender' | 'id' | 'image' | 'name' | 'species' | 'status'
> & { episode: (Pick<Episode, 'id' | 'name' | 'episode'> | null)[] };
