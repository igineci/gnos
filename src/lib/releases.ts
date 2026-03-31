import { allReleases } from 'content-collections';
import type { Release } from 'content-collections';
import { getArtistOverridesForRelease } from '@/data/releases';
import { nameToSlug } from '@/data/person';

/** Format release date for display. Handles DD/MM/YYYY, YYYY-MM-DD, and TBD. */
export function formatReleaseDate(dateStr: string | undefined): string {
  if (!dateStr || dateStr.toUpperCase().includes('TBD')) return 'TBD';
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) return dateStr;
  const match = dateStr?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const [, year, month, day] = match;
    return `${day}/${month}/${year}`;
  }
  return dateStr ?? '';
}

export type ArtistDisplayFormat = 'short' | 'full';

/** Alphabetical order by display name (case- and accent-insensitive). */
export function sortArtistsByName<T extends { name: string }>(artists: T[]): T[] {
  return [...artists].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  );
}

export type ReleaseArtistDisplayItem = {
  name: string;
  slug: string;
  image?: string;
};

/** VA line-up for UI: same portrait URLs as GNOS Team “Featured artists” (MDX + release overrides). */
export function getReleaseArtistsDisplayList(
  release: Release
): ReleaseArtistDisplayItem[] {
  if (release.type !== 'va' || !release.artists?.length) return [];
  const overrides = getArtistOverridesForRelease(release.slug);
  return sortArtistsByName(release.artists).map((a) => {
    const slug = nameToSlug(a.name);
    return {
      name: a.name,
      slug,
      image: overrides?.[slug]?.image ?? a.image,
    };
  });
}

/**
 * Get display string for release artist(s).
 * - short: VA → "Various Artists", album → artist name
 * - full: VA → comma-separated artist names, album → artist name
 */
export function getArtistDisplay(
  release: Release,
  format: ArtistDisplayFormat = 'short'
): string {
  if (release.type === 'album') {
    return release.artist ?? '';
  }
  if (release.type === 'va') {
    if (format === 'full' && release.artists?.length) {
      return sortArtistsByName(release.artists)
        .map((a) => a.name)
        .join(', ');
    }
    return 'Various Artists';
  }
  return '';
}

/** Parse release date for sorting. Returns timestamp or Infinity for TBD/unparseable. */
function parseReleaseDate(dateStr: string | undefined): number {
  if (!dateStr || dateStr.toUpperCase().includes('TBD')) return Infinity;
  const ddmmyyyy = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (ddmmyyyy) {
    const [, day, month, year] = ddmmyyyy;
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
  }
  const yyyymmdd = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (yyyymmdd) {
    const [, year, month, day] = yyyymmdd;
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
  }
  return Infinity;
}

/**
 * Releases sorted by date (newest first), with TBD/unparseable at the end.
 * Secondary sort by catalog number for stable ordering.
 */
export const sortedReleases: Release[] = [...allReleases].sort((a, b) => {
  const dateA = parseReleaseDate(a.releaseDate);
  const dateB = parseReleaseDate(b.releaseDate);
  if (dateA !== dateB) return dateB - dateA;
  return (a.catalogNumber ?? '').localeCompare(b.catalogNumber ?? '');
});

const isUpcomingByDate = (release: Release) =>
  release.releaseDate?.toUpperCase().includes('TBD') ?? false;

/** Upcoming: releases with TBD (or missing) release date */
export const upcomingReleases = sortedReleases.filter((r) =>
  isUpcomingByDate(r)
);

/** Catalog: releases that are not upcoming */
export const catalogReleases = sortedReleases.filter(
  (r) => !upcomingReleases.includes(r)
);
