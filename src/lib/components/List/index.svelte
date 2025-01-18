<script lang="ts">
  import type { ListCharacter } from '$lib/types/Character';
  import type { ListEpisode } from '$lib/types/ListEpisode';
  import type { Component } from 'svelte';

  type T = $$Generic<ListCharacter | ListEpisode>;

  interface Props {
    ItemComponent: Component<{ item: T; index: number }>;
    items: T[];
    title: string;
  }

  const { items, title, ItemComponent }: Props = $props();
</script>

<section>
  <h4>{title}</h4>

  {#if items.length}
    <div>
      {#each items as item, index}
        <ItemComponent {index} {item}></ItemComponent>
      {/each}
    </div>
  {:else}
    <h1>No data found</h1>
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--pico-color-indigo-150);
    border-radius: 2rem;
    padding: 1rem 2rem;
    max-width: max-content;
  }

  h4 {
    color: var(--pico-color-grey-400);
  }

  div {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: var(--justify-content, 'unset');
  }
</style>
