<script lang="ts">
  import Form from '$lib/components/Form/index.svelte';
  import Loader from '$lib/components/Loader/index.svelte';
  import List from '$lib/components/List/index.svelte';
  import CharactersListItem from '$lib/components/List/CharacterListItem.svelte';
  import EpisodeListItem from '$lib/components/List/EpisodeListItem.svelte';

  const { form } = $props();

  let loading = $state(false);
  let phrase = $state('');

  let isValid = $derived(phrase.length >= 3);
</script>

<section>
  <Form action="?/search" {isValid} bind:loading>
    <div class="search-with-button">
      <div>
        <input
          type="search"
          name="phrase"
          placeholder="Search episodes and characters"
          aria-label="Search"
          aria-invalid={!isValid}
          aria-describedby="invalid-helper"
          bind:value={phrase}
        />
        {#if !isValid}
          <small id="invalid-helper"> Enter at least 3 symbols </small>
        {/if}
      </div>

      <button type="submit" disabled={loading || !isValid}>Find</button>
    </div>
  </Form>

  {#if loading}
    <Loader />
  {:else}
    {#if form?.episodes}
      <List ItemComponent={EpisodeListItem} items={form.episodes} title="Episodes:" />
    {/if}

    {#if form?.characters}
      <List
        ItemComponent={CharactersListItem}
        items={form.characters}
        title="Characters:"
        --justify-content="space-around"
      />
    {/if}

    {#if form?.message}
      <h1>{form.message}</h1>
    {/if}
  {/if}
</section>

<style>
  section {
    padding: 2rem;
  }

  .search-with-button {
    display: flex;
    gap: 1rem;
    width: 100%;

    button {
      max-width: min-content;
      max-height: max-content;
    }

    div {
      width: 100%;
    }

    #invalid-helper {
      margin-left: 2rem;
    }
  }
</style>
