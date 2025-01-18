import type { InputEpisode } from '$lib/types/InputEpisode';
import type { ListEpisode } from '$lib/types/ListEpisode';

export const getSeason = (episode: string) => {
  const season = episode.toLowerCase().match(/^s0\d/g)?.[0];
  return season ?? 'unknown';
};

export const prepareEpisodes = (episodes: InputEpisode[] = []): ListEpisode[] => {
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
  }, [] as ListEpisode[]);
};
