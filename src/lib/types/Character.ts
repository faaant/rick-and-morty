import type { GetCharacterQuery } from '$lib/graphql/query/GetCharacter';

export type ResponseCharacter = NonNullable<GetCharacterQuery['character']>;

export interface Character {
  id: string;
  name: string;
  image: string;
  status?: CharacterStatus;
  species?: string | null | undefined;
  gender?: string | null | undefined;
}

export const characterStatus = {
  alive: 'Alive',
  dead: 'Dead',
  unknown: 'unknown'
} as const;
export type CharacterStatus = (typeof characterStatus)[keyof typeof characterStatus];
