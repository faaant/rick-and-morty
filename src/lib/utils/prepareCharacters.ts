import type { InputEpisode } from '$lib/types/InputEpisode';
import type { Character, CharacterStatus, ListCharacter } from '$lib/types/Character';
import { prepareEpisodes } from './prepareEpisodes';
import type { InputCharacter } from '$lib/types/InputCharacter';

export const prepareCharacters = (episodes: InputEpisode[] = []): ListCharacter[] => {
  return Array.from(
    episodes
      .flatMap((episode) => episode?.characters ?? [])
      .reduce((acc, character) => {
        if (character?.id) {
          acc.set(character.id, prepareCharacter(character));
        }
        return acc;
      }, new Map<string, ListCharacter>())
      .values()
  );
};

export const prepareCharacter = (character: Partial<InputCharacter>): Character => {
  return {
    episode: prepareEpisodes(character.episode),
    gender: character?.gender,
    id: character?.id ?? 'Not found',
    image: character.image ?? 'Not found',
    name: character.name ?? 'Not found',
    species: character?.species,
    status: character?.status as CharacterStatus
  };
};
