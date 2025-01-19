import { client } from '$lib/graphql/client';
import { SearchDocument } from '$lib/graphql/query/Search';
import { prepareCharacter } from '$lib/utils/prepareCharacters';
import { prepareEpisodes } from '$lib/utils/prepareEpisodes';
import { fail, type Actions } from '@sveltejs/kit';

export const actions = {
  search: async (event) => {
    const formData = await event.request.formData();

    let phrase = formData.get('phrase');
    if (typeof phrase !== 'string') {
      phrase = '';
    }

    const { data, error } = await client.query(SearchDocument, { name: phrase });

    if (error) {
      return fail(error.response?.status ?? 500, { message: error.message });
    }

    const characters =
      data?.characters?.results?.length && data.characters.results.map(prepareCharacter);
    const episodes = data?.episodes?.results?.length && prepareEpisodes(data.episodes.results);

    if (!characters && !episodes) {
      return fail(404, { message: 'No data found' });
    }

    return { characters, episodes };
  }
} satisfies Actions;
