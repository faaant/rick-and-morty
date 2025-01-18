import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is string => {
  const seasonRegexp = /^s\d{2}$/;
  return seasonRegexp.test(param);
}) satisfies ParamMatcher;
