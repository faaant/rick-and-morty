<script lang="ts">
  import CharacterCard from '$lib/components/CharacterCard/index.svelte';
  import List from '$lib/components/List/index.svelte';
  import EpisodeListItem from '$lib/components/List/EpisodeListItem.svelte';

  const { data } = $props();
</script>

<section>
  <center>
    <CharacterCard character={data.character} />
    <List
      ItemComponent={EpisodeListItem}
      items={data.episodes}
      title="Episodes with this character:"
    />
  </center>
</section>

<style>
  section {
    padding: 2rem;
    height: 100%;
  }
</style>
