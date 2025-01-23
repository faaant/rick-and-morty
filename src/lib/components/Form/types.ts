export type ValidationSchema = Record<string, (value: string) => string | undefined>;
export type FormErrors = Record<string, string>;
