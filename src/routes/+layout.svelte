<script lang="ts">
  import { setContextClient } from '@urql/svelte';
  import { client } from '$lib/graphql/client';
  import Header from '$lib/components/Header/index.svelte';
  import Footer from '$lib/components/Footer/index.svelte';

  setContextClient(client);

  const { children } = $props();
</script>

<Header />
<main>
  {@render children()}
</main>
<Footer />

<style>
  main {
    min-height: calc(100vh - 4rem);
  }
</style>
