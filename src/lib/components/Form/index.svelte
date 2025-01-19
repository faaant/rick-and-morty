<script lang="ts">
  import { enhance } from '$app/forms';
  import type { Snippet } from 'svelte';

  interface Props {
    action: string;
    loading?: boolean;
    children: Snippet;
    isValid?: boolean;
  }
  let { action, loading = $bindable(false), children, isValid = true }: Props = $props();
</script>

<form
  {action}
  method="POST"
  use:enhance={({ cancel }) => {
    if (!isValid) {
      return cancel();
    }

    loading = true;

    return async ({ update }) => {
      update({ reset: false }).then(() => {
        loading = false;
      });
    };
  }}
>
  {@render children()}
</form>
