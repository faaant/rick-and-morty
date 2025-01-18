import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string) => {
  const characterRegexp = /^\d+$/;
  return characterRegexp.test(param);
}) satisfies ParamMatcher;
