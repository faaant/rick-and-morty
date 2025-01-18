import type { GetEpisodeQuery } from '$lib/graphql/query/GetEpisode';

export type ResponseEpisode = Partial<GetEpisodeQuery['episode']>;

export interface Episode {
  id: string;
  name: string;
  link: string;
}
