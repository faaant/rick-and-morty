<script lang="ts">
  import CharacterCard from '$lib/components/CharacterCard/index.svelte';
  import type { Character } from '$lib/types/Character';

  interface Props {
    item: Character;
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
