<script lang="ts">
  import CharacterCard from '$lib/components/CharacterCard/index.svelte';
  import type { ListCharacter } from '$lib/types/Character';

  interface Props {
    item: ListCharacter;
  }

  const { item }: Props = $props();
</script>

<a href="/{item.id}">
  <CharacterCard character={item} />
</a>

<style>
  a {
    text-decoration: none;
  }
</style>
