<script module>
  import { characterStatus } from '$lib/types/Character';
  const statusColorMap = {
    [characterStatus.alive]: '--pico-color-jade-300',
    [characterStatus.dead]: '--pico-color-pink-300',
    [characterStatus.unknown]: '--pico-color-pumpkin-300'
  };
</script>

<script lang="ts">
  import { type Character, type ListCharacter } from '$lib/types/Character';

  type OptionalFields = Partial<Omit<Character, keyof ListCharacter>>;
  interface Props {
    character: ListCharacter & OptionalFields;
  }

  const { character }: Props = $props();
</script>

<article>
  {#if !!character.species}
    <header>
      {character.species} /
      {character.gender}
    </header>
  {/if}
  <figure>
    <img alt="{character.name} image" src={character.image} />
    <figcaption>
      {character.name}
    </figcaption>
  </figure>
  {#if character.status}
    <footer style:background-color="var({statusColorMap[character.status]})">
      {character.status}
    </footer>
  {/if}
</article>

<style>
  article {
    background-color: var(--pico-color-indigo-50);
    height: 100%;
    width: max-content;
  }

  header {
    background-color: var(--pico-color-indigo-400);
    color: var(--pico-color-indigo-50);
  }

  footer {
    color: var(--pico-color-indigo-50);
  }

  figure {
    width: 150px;
  }
</style>
