import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string) => {
  const numberRegexp = /^\d+$/;
  return numberRegexp.test(param);
}) satisfies ParamMatcher;
