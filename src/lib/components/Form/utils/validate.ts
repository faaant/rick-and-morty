import type { FormErrors, ValidationSchema } from '../types';

export const validate = (form: HTMLFormElement, schema: ValidationSchema) => {
  const errors: FormErrors = {};

  Object.entries(schema).forEach(([key, validationFn]) => {
    const formField = form.elements.namedItem(key) ?? {};
    let value = '';
    if ('value' in formField) {
      value = formField.value as string;
    }

    const validationResult = validationFn(value);

    if (!validationResult) {
      return;
    }

    errors[key] = validationResult;
  });

  return errors;
};
