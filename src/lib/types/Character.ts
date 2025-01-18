import type { GetCharacterQuery } from '$lib/graphql/query/GetCharacter';
import type { Episode } from './Episode';

export type ResponseCharacter = Partial<GetCharacterQuery['character']>;

export interface Character {
  id: string;
  name: string;
  image: string;
  status?: CharacterStatus;
  species?: string | null | undefined;
  gender?: string | null | undefined;
  episode: Episode[];
}

export const characterStatus = {
  alive: 'Alive',
  dead: 'Dead',
  unknown: 'unknown'
} as const;
export type CharacterStatus = (typeof characterStatus)[keyof typeof characterStatus];
