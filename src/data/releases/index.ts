import type { ReleaseArtistOverridesMap } from '@/data/person';
import {
  GNOS001_ARTIST_OVERRIDES,
  GNOS001_RELEASE_SLUG,
} from './gnos001-ignorantia';

export const artistOverridesByReleaseSlug: Record<
  string,
  ReleaseArtistOverridesMap
> = {
  [GNOS001_RELEASE_SLUG]: GNOS001_ARTIST_OVERRIDES,
};


export const FEATURED_RELEASE_SLUG = GNOS001_RELEASE_SLUG;

export function getArtistOverridesForRelease(
  slug: string | undefined
): ReleaseArtistOverridesMap | undefined {
  if (!slug) return undefined;
  return artistOverridesByReleaseSlug[slug];
}
