<script lang="ts">
  import Logo from './assets/logo.svelte';
</script>

<header>
  <Logo />
  <h1>Rick and Morty</h1>
</header>

<style>
  header {
    display: flex;
    align-items: center;
    min-height: 4rem;
    background-color: var(--pico-color-slate-150);
    box-shadow: var(--pico-box-shadow);
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  h1 {
    margin: 0;
    color: var(--pico-color-grey-700);
  }
</style>
