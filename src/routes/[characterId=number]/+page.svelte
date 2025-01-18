<script lang="ts">
  import { queryStore, getContextClient } from '@urql/svelte';
  import { page } from '$app/state';
  import {
    type GetCharacterQuery,
    type GetCharacterQueryVariables,
    GetCharacterDocument
  } from '$lib/graphql/query/GetCharacter';
  import CharacterCard from '$lib/components/CharacterCard/index.svelte';
  import Loader from '$lib/components/Loader/index.svelte';
  import ErrorAlert from '$lib/components/ErrorAlert/index.svelte';
  import List from '$lib/components/List/index.svelte';
  import { prepareEpisodes } from '$lib/utils/prepareEpisodes';
  import EpisodeListItem from '$lib/components/List/EpisodeListItem.svelte';
  import { prepareCharacter } from '$lib/utils/prepareCharacters';

  const characterResponse = queryStore<GetCharacterQuery, GetCharacterQueryVariables>({
    client: getContextClient(),
    query: GetCharacterDocument,
    variables: { id: page.params.characterId ?? '' }
  });

  const episodes = $derived(prepareEpisodes($characterResponse.data?.character?.episode ?? []));
  const character = $derived(prepareCharacter($characterResponse.data?.character ?? {}));
</script>

<section>
  {#if $characterResponse.fetching}
    <div style:height="500px">
      <Loader />
    </div>
  {:else if $characterResponse.error}
    <ErrorAlert
      text="There was an error while fetching this season, please try reloading the page. If the problem
    persists, please contact support."
    />
  {:else}
    <center>
      <CharacterCard {character} />
      <List
        ItemComponent={EpisodeListItem}
        items={episodes}
        title="Episodes with this character:"
      />
    </center>
  {/if}
</section>

<style>
  section {
    padding: 2rem;
    height: 100%;
  }
</style>
