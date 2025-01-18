import type { Character, Episode } from '$lib/graphql/schema-types';
import type { ListCharacter } from '$lib/types/ListCharacter';
import type { ListEpisode } from '$lib/types/ListEpisode';

type InputEpisode =
  | (Pick<Episode, 'id' | 'name'> & {
      characters?: (Pick<Character, 'id' | 'name' | 'image'> | null)[];
    })
  | null;

export const prepareCharacters = (episodes: InputEpisode[] = []) => {
  return Array.from(
    episodes
      .flatMap((episode) => episode?.characters ?? [])
      .reduce((acc, character) => {
        if (character?.id) {
          acc.set(character?.id, {
            id: character?.id ?? 'Not found',
            image: character.image ?? 'Not found',
            name: character.name ?? 'Not found'
          });
        }
        return acc;
      }, new Map<string, ListCharacter>())
      .values()
  );
};

export const prepareEpisodes = (episodes: InputEpisode[] = [], season?: string): ListEpisode[] => {
  return episodes.reduce((acc, episode) => {
    if (episode) {
      acc.push({
        id: episode.id ?? 'Not found',
        link: episode.id && season ? `/${season}/${episode.id}` : 'Not found',
        name: episode.name ?? 'Not found'
      });
    }

    return acc;
  }, [] as ListEpisode[]);
};
