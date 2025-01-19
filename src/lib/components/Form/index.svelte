<script lang="ts">
  import { enhance } from '$app/forms';
  import type { Snippet } from 'svelte';
  import type { FormErrors, ValidationSchema } from './types';
  import { validate } from './utils/validate';

  interface Props {
    action: string;
    children: Snippet;
    errors?: FormErrors;
    loading?: boolean;
    isValid?: boolean;
    validationSchema: ValidationSchema;
  }

  let {
    action,
    validationSchema,
    errors = $bindable({}),
    loading = $bindable(false),
    isValid = $bindable(true),
    children
  }: Props = $props();

  let form = $state<HTMLFormElement>();
</script>

<form
  {action}
  method="POST"
  bind:this={form}
  use:enhance={({ cancel }) => {
    if (!form) {
      return cancel();
    }

    errors = validate(form, validationSchema);
    isValid = !Object.values(errors).length;

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
