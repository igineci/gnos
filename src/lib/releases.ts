import { allReleases } from 'content-collections';
import type { Release } from 'content-collections';

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
      return release.artists.map((a) => a.name).join(', ');
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
