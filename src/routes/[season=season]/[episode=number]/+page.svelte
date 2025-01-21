<script lang="ts">
  import List from '$lib/components/List/index.svelte';
  import CharactersListItem from '$lib/components/List/CharacterListItem.svelte';

  const { data } = $props();
</script>

<section>
  <h1>
    {data.season.toUpperCase()} / Episode: {data.episode?.name ?? 'Not found'}
  </h1>
  <List
    ItemComponent={CharactersListItem}
    items={data.characters}
    title="Characters that appears in this episode:"
    --justify-content="space-around"
  />
</section>

<style>
  section {
    padding: 2rem;
    height: 100%;
  }
</style>
