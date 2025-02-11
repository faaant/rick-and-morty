<script lang="ts">
  import List from '$lib/components/List/index.svelte';
  import CharactersListItem from '$lib/components/List/CharacterListItem.svelte';
  import EpisodeListItem from '$lib/components/List/EpisodeListItem.svelte';

  const { data } = $props();
</script>

<section>
  <h3>Season details:</h3>
  <List ItemComponent={EpisodeListItem} items={data.episodes} title="Episodes:" />
  <List ItemComponent={CharactersListItem} items={data.characters} title="Characters:" />
</section>

<style>
  section {
    --justify-content: space-around;

    padding: 2rem;
  }

  h3 {
    padding-left: 2rem;
  }
</style>
