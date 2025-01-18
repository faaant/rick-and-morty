<script lang="ts">
  import { queryStore, getContextClient } from '@urql/svelte';
  import { page } from '$app/state';
  import {
    type GetSeasonQuery,
    type GetSeasonQueryVariables,
    GetSeasonDocument
  } from '$lib/graphql/query/GetSeason';
  import Loader from '$lib/components/Loader/index.svelte';
  import ErrorAlert from '$lib/components/ErrorAlert/index.svelte';
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
  <h3>Season details:</h3>
  {#if $season.fetching}
    <div style:height="500px">
      <Loader />
    </div>
  {:else if $season.error}
    <ErrorAlert
      text="There was an error while fetching this season, please try reloading the page. If the problem
    persists, please contact support."
    />
  {:else}
    <List ItemComponent={EpisodeListItem} items={episodes} title="Episodes:" />
    <List
      ItemComponent={CharactersListItem}
      items={characters}
      title="Characters:"
      --justify-content="space-around"
    />
  {/if}
</section>

<style>
  section {
    padding: 2rem;
  }

  h3 {
    padding-left: 2rem;
  }
</style>
