import type { FormErrors, ValidationSchema } from '../types';

export const validate = (form: HTMLFormElement, schema: ValidationSchema) => {
  const errors: FormErrors = {};

  Object.entries(schema).forEach(([key, validationFn]) => {
    const formField = form.elements.namedItem(key);

    let value = '';
    if (formField && 'value' in formField && typeof formField.value === 'string') {
      value = formField.value;
    }

    const validationResult = validationFn(value);
    if (!validationResult) {
      return;
    }

    errors[key] = validationResult;
  });

  return errors;
};
