<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
</script>

<section>
  <div>
    <h1>Ooops... {page.status >= 500 ? 'Smth went wrong' : 'Not found'}</h1>
    <h3>
      <button onclick={() => goto('/')}>Go back!</button>
    </h3>
  </div>
</section>

<style>
  section {
    min-height: calc(100vh - 4rem);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
