import type { Character, CharacterStatus, ResponseCharacter } from '$lib/types/Character';

export const prepareCharacter = (
  character: Omit<ResponseCharacter, 'episode'> | null
): Character => {
  return {
    gender: character?.gender,
    id: character?.id ?? 'Not found',
    image: character?.image ?? 'Not found',
    name: character?.name ?? 'Not found',
    species: character?.species,
    status: character?.status as CharacterStatus
  };
};

export const getUniqueCharacters = (
  characters: (Omit<ResponseCharacter, 'episode'> | null)[] = []
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
