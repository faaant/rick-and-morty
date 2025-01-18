import type { Character, CharacterStatus } from '$lib/types/Character';
import type { Character as GqlCharacter } from '$lib/graphql/schema-types';
import { prepareEpisodes } from './prepareEpisodes';
import type { InputCharacter } from '$lib/types/InputCharacter';

export const prepareCharacter = (character: Partial<InputCharacter>): Character => {
  return {
    episode: character.episode ? prepareEpisodes(character.episode) : [],
    gender: character?.gender,
    id: character?.id ?? 'Not found',
    image: character.image ?? 'Not found',
    name: character.name ?? 'Not found',
    species: character?.species,
    status: character?.status as CharacterStatus
  };
};

export const getUniqueCharacters = (
  characters: (Pick<GqlCharacter, 'id' | 'name' | 'image'> | null)[]
): Character[] => {
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
