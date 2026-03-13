import { sortedReleases } from '@/lib/releases';

export type GnosArtist = {
  name: string;
  image?: string;
};

/** Featured artists: from IGNORANTIA (gnos001) release. Edit order or add more in this file. */
export function getFeaturedArtists(): GnosArtist[] {
  const release = sortedReleases.find((r) => r.slug === 'ignorantia');
  return release?.artists ?? [];
}

/** Team members: same shape as artists so you can use images. Configure list here. */
export function getTeamMembers(): GnosArtist[] {
  const release = sortedReleases.find((r) => r.slug === 'ignorantia');
  return release?.artists ?? [];
}
