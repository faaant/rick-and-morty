<script lang="ts">
  import type { Episode } from '$lib/types/Episode';

  interface Props {
    item: Episode;
  }

  const { item }: Props = $props();
</script>

<a data-tooltip={item.name} href={item.link}>
  {item.id}
</a>

<style>
  a {
    align-items: center;
    background-color: var(--pico-color-indigo-400);
    border-color: var(--pico-color-indigo-600);
    color: var(--pico-color-indigo-50);
    border-radius: 0.5rem;
    display: flex;
    height: 2rem;
    justify-content: center;
    text-decoration: none;
    width: 2rem;
  }
</style>
