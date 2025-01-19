import type { ValidationSchema } from '$lib/components/Form/types';

export const searchValidationSchema: ValidationSchema = {
  phrase: (value) => {
    if (value.length < 3) {
      return 'Enter at least 3 symbols';
    }
    return;
  }
};
