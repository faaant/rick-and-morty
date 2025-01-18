<script lang="ts">
  import type { ListCharacter } from '$lib/types/ListCharacter';

  interface Props {
    item: ListCharacter;
  }

  const { item }: Props = $props();
</script>

<a href="/{item.id}">
  <article>
    <figure>
      <img alt="{item.name} image" src={item.image} />
      <figcaption>
        {item.name}
      </figcaption>
    </figure>
  </article>
</a>

<style>
  a {
    text-decoration: none;
  }

  article {
    background-color: var(--pico-color-indigo-50);
    height: 100%;
  }

  figure {
    width: 150px;
  }
</style>
