/**
 * Release types — aligned with content-collections releases schema.
 * Use `Release` from content-collections for runtime; these are for local typing.
 */

export type ReleaseType = 'album' | 'va';

export interface TracklistItem {
  title: string;
  artist: string;
  duration?: string;
}

export interface ReleaseArtist {
  name: string;
  bio?: string;
}

export interface ReleaseCredit {
  role: string;
  name: string;
}
