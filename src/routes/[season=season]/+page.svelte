<script lang="ts">
  import { queryStore, getContextClient } from '@urql/svelte';
  import { page } from '$app/state';
  import {
    type GetSeasonQuery,
    type GetSeasonQueryVariables,
    GetSeasonDocument
  } from '$lib/graphql/query/GetSeason';
  import PageContent from '$lib/components/PageContent/index.svelte';
  import List from '$lib/components/List/index.svelte';
  import CharactersListItem from '$lib/components/List/CharacterListItem.svelte';
  import { getUniqueCharacters } from '$lib/utils/prepareCharacters';
  import { prepareEpisodes } from '$lib/utils/prepareEpisodes';
  import EpisodeListItem from '$lib/components/List/EpisodeListItem.svelte';

  const season = queryStore<GetSeasonQuery, GetSeasonQueryVariables>({
    client: getContextClient(),
    query: GetSeasonDocument,
    variables: { season: page.params.season ?? '' }
  });

  const episodes = $derived(prepareEpisodes($season.data?.episodes?.results ?? []));
  const characters = $derived(
    getUniqueCharacters(
      $season.data?.episodes?.results?.flatMap((episode) => episode?.characters ?? []) ?? []
    )
  );
</script>

<section>
  <PageContent
    loading={$season.fetching}
    error={!!$season.error}
    empty={!episodes.length && !characters.length}
  >
    <h3>Season details:</h3>
    <List ItemComponent={EpisodeListItem} items={episodes} title="Episodes:" />
    <List
      ItemComponent={CharactersListItem}
      items={characters}
      title="Characters:"
      --justify-content="space-around"
    />
  </PageContent>
</section>

<style>
  section {
    padding: 2rem;
  }

  h3 {
    padding-left: 2rem;
  }
</style>
