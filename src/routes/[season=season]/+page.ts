import { client } from '$lib/graphql/client';
import type { PageLoad } from './$types';

import { GetSeasonDocument } from '$lib/graphql/query/GetSeason';
import { prepareEpisodes } from '$lib/utils/prepareEpisodes';
import { getUniqueCharacters } from '$lib/utils/prepareCharacters';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  const response = await client.query(GetSeasonDocument, {
    season: params.season
  });

  const episodes = response.data?.episodes?.results ?? [];

  if (!episodes.length) {
    return error(404, { message: 'Not found' });
  }

  return {
    characters: getUniqueCharacters(episodes.flatMap((episode) => episode?.characters ?? [])),
    episodes: prepareEpisodes(episodes)
  };
};
