import type { ResponseEpisode } from '$lib/types/Episode';
import type { Episode } from '$lib/types/Episode';

export const getSeason = (episode: string) => {
  const season = episode.toLowerCase().match(/^s0\d/g)?.[0];
  return season ?? 'unknown';
};

export const prepareEpisodes = (episodes: ResponseEpisode[] = []): Episode[] => {
  return episodes.reduce((acc, episode) => {
    const season = getSeason(episode?.episode ?? '');
    if (episode) {
      acc.push({
        id: episode.id ?? 'Not found',
        link: episode.id && season ? `/${season}/${episode.id}` : 'Not found',
        name: episode.name ?? 'Not found'
      });
    }

    return acc;
  }, [] as Episode[]);
};
