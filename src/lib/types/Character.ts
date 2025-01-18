import type { ListEpisode } from './ListEpisode';

export interface ListCharacter {
  id: string;
  name: string;
  image: string;
}

export interface Character extends ListCharacter {
  status?: CharacterStatus;
  species?: string | null | undefined;
  gender?: string | null | undefined;
  episode: ListEpisode[];
}

export const characterStatus = {
  alive: 'Alive',
  dead: 'Dead',
  unknown: 'unknown'
} as const;
export type CharacterStatus = (typeof characterStatus)[keyof typeof characterStatus];
