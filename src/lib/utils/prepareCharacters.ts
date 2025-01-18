import type { Character, CharacterStatus, ResponseCharacter } from '$lib/types/Character';
import { prepareEpisodes } from './prepareEpisodes';

export const prepareCharacter = (character: ResponseCharacter): Character => {
  return {
    episode: character?.episode ? prepareEpisodes(character.episode) : [],
    gender: character?.gender,
    id: character?.id ?? 'Not found',
    image: character?.image ?? 'Not found',
    name: character?.name ?? 'Not found',
    species: character?.species,
    status: character?.status as CharacterStatus
  };
};

export const getUniqueCharacters = (characters: ResponseCharacter[]): Character[] => {
  return Array.from(
    characters
      .reduce((acc, character) => {
        if (character?.id) {
          acc.set(character.id, prepareCharacter(character));
        }
        return acc;
      }, new Map<string, Character>())
      .values()
  );
};
