<script lang="ts">
  import Form from '$lib/components/Form/index.svelte';
  import Loader from '$lib/components/Loader/index.svelte';
  import List from '$lib/components/List/index.svelte';
  import CharactersListItem from '$lib/components/List/CharacterListItem.svelte';
  import EpisodeListItem from '$lib/components/List/EpisodeListItem.svelte';
  import type { FormErrors } from '$lib/components/Form/types.js';
  import { searchValidationSchema } from '$lib/utils/validationSchema.js';

  const { form } = $props();

  let loading = $state(false);
  let errors = $state<FormErrors>({});
  let phrase = $state('');
</script>

<section>
  <Form action="?/search" validationSchema={searchValidationSchema} bind:errors bind:loading>
    <div class="search-with-button">
      <div>
        <input
          type="search"
          name="phrase"
          placeholder="Search episodes and characters"
          aria-label="Search"
          aria-invalid={!!errors['phrase']}
          aria-describedby="invalid-helper"
          bind:value={phrase}
        />
        {#if errors['phrase']}
          <small id="invalid-helper"> {errors['phrase']} </small>
        {/if}
      </div>
      <button type="submit" disabled={loading}>Find</button>
    </div>
  </Form>

  {#if loading}
    <Loader />
  {:else}
    {#if form?.episodes}
      <List ItemComponent={EpisodeListItem} items={form.episodes} title="Episodes:" />
    {/if}

    {#if form?.characters}
      <List ItemComponent={CharactersListItem} items={form.characters} title="Characters:" />
    {/if}

    {#if form?.message}
      <h1>{form.message}</h1>
    {/if}
  {/if}
</section>

<style>
  section {
    --justify-content: space-around;

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
