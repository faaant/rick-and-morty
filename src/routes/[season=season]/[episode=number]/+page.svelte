<script lang="ts">
  import { queryStore, getContextClient } from '@urql/svelte';
  import { page } from '$app/state';
  import {
    type GetEpisodeQuery,
    type GetEpisodeQueryVariables,
    GetEpisodeDocument
  } from '$lib/graphql/query/GetEpisode';
  import Loader from '$lib/components/Loader/index.svelte';
  import ErrorAlert from '$lib/components/ErrorAlert/index.svelte';
  import List from '$lib/components/List/index.svelte';
  import CharactersListItem from '$lib/components/List/CharacterListItem.svelte';
  import { prepareCharacter } from '$lib/utils/prepareCharacters';
  import { getSeason } from '$lib/utils/prepareEpisodes';

  const episodeResponse = queryStore<GetEpisodeQuery, GetEpisodeQueryVariables>({
    client: getContextClient(),
    query: GetEpisodeDocument,
    variables: { id: page.params.episode ?? '' }
  });

  const episode = $derived($episodeResponse.data?.episode);
  const season = $derived(getSeason(episode?.episode ?? ''));
  const characters = $derived(
    $episodeResponse.data?.episode
      ? $episodeResponse.data?.episode.characters.map((character) =>
          prepareCharacter(character ?? {})
        )
      : []
  );
</script>

<section>
  {#if season !== page.params.season}
    <h1>Episode not found</h1>
  {:else if $episodeResponse.fetching}
    <div style:height="500px">
      <Loader />
    </div>
  {:else if $episodeResponse.error}
    <ErrorAlert
      text="There was an error while fetching this season, please try reloading the page. If the problem
    persists, please contact support."
    />
  {:else}
    <h1>
      {season.toUpperCase()} / Episode: {episode?.name ?? 'Not found'}
    </h1>
    <List
      ItemComponent={CharactersListItem}
      items={characters}
      title="Characters that appears in this episode:"
      --justify-content="space-around"
    />
  {/if}
</section>

<style>
  section {
    padding: 2rem;
    height: 100%;
  }
</style>
