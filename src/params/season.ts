import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is string => {
  const seasonRegexp = /^s0\d{1}$/;
  return seasonRegexp.test(param);
}) satisfies ParamMatcher;
