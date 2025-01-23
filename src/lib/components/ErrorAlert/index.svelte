<script lang="ts">
  interface Props {
    text: string;
  }

  const { text }: Props = $props();
</script>

<p>
  {text}
</p>

<style>
  p {
    padding: 2rem;
    background-color: var(--pico-color-red-300);
    color: var(--pico-contrast);
  }
</style>
