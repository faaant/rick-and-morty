import { client } from '$lib/graphql/client';
import type { PageLoad } from './$types';

import { GetCharacterDocument } from '$lib/graphql/query/GetCharacter';
import { prepareEpisodes } from '$lib/utils/prepareEpisodes';
import { prepareCharacter } from '$lib/utils/prepareCharacters';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  const { data: { character } = {} } = await client.query(GetCharacterDocument, {
    id: params.characterId
  });

  if (!character) {
    return error(404, { message: 'Not found' });
  }

  return {
    character: prepareCharacter(character),
    episodes: prepareEpisodes(character.episode)
  };
};
