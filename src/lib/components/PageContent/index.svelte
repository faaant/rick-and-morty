<script lang="ts">
  import Loader from '$lib/components/Loader/index.svelte';
  import NotFound from '$lib/components/NotFound/index.svelte';
  import ErrorAlert from '$lib/components/ErrorAlert/index.svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    empty: boolean;
    error: boolean;
    loading: boolean;
  }

  const { empty, error, loading, children }: Props = $props();
</script>

{#if loading}
  <div style:height="500px">
    <Loader />
  </div>
{:else if error}
  <ErrorAlert
    text="There was an error while fetching data, please try reloading the page. If the problem
    persists, please contact support."
  />
{:else if empty}
  <NotFound />
{:else}
  {@render children()}
{/if}
