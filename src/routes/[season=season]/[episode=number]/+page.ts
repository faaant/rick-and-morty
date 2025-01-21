import { client } from '$lib/graphql/client';
import type { PageLoad } from './$types';

import { GetEpisodeDocument } from '$lib/graphql/query/GetEpisode';
import { getSeason } from '$lib/utils/prepareEpisodes';
import { prepareCharacter } from '$lib/utils/prepareCharacters';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  const { data: { episode } = {} } = await client.query(GetEpisodeDocument, { id: params.episode });
  const season = getSeason(episode?.episode ?? '');

  if (!episode || season !== params.season) {
    return error(404, { message: 'Not found' });
  }

  const characters = episode.characters.map(prepareCharacter);

  return {
    characters,
    episode,
    season
  };
};
