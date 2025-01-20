<script lang="ts">
  import { queryStore, getContextClient } from '@urql/svelte';
  import { page } from '$app/state';
  import {
    type GetEpisodeQuery,
    type GetEpisodeQueryVariables,
    GetEpisodeDocument
  } from '$lib/graphql/query/GetEpisode';
  import PageContent from '$lib/components/PageContent/index.svelte';
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
  <PageContent
    loading={$episodeResponse.fetching}
    error={!!$episodeResponse.error}
    empty={season !== page.params.season}
  >
    <h1>
      {season.toUpperCase()} / Episode: {episode?.name ?? 'Not found'}
    </h1>
    <List
      ItemComponent={CharactersListItem}
      items={characters}
      title="Characters that appears in this episode:"
      --justify-content="space-around"
    />
  </PageContent>
</section>

<style>
  section {
    padding: 2rem;
    height: 100%;
  }
</style>
