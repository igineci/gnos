import { sortArtistsByName, sortedReleases } from '@/lib/releases';
import {
  FEATURED_RELEASE_SLUG,
  getArtistOverridesForRelease,
} from '@/data/releases';
import type { ArtistProfileOverrides, InterviewQAItem, Person } from '@/data/person';
import { nameToSlug } from '@/data/person';
import { TEAM_MEMBERS } from './teamMembers';

export type { ArtistProfileOverrides, GnosArtist, Person } from '@/data/person';
export { nameToSlug } from '@/data/person';

const DEFAULT_BIO =
  'Rooted in the underground since early days, exploring the deeper layers of hypnotic techno. Sound merges driving rhythms, deep atmospheres and evolving textures.';
const DEFAULT_INTERVIEW: InterviewQAItem[] = [
  {
    q: 'What inspired your path into techno production?',
    a: 'The hypnotic energy of artists who focus on texture and depth reshaped the way I understood rhythm and sound design.',
  },
  {
    q: 'How do you approach creating a new track?',
    a: 'I start with atmosphere. Layers, frequencies, movement. I build slowly, letting the track breathe. Each element has to serve the journey.',
  },
];
const DEFAULT_PROMO_LINKS: { label: string; url: string }[] = [
  { label: 'BANDCAMP', url: '#' },
  { label: 'SPOTIFY', url: '#' },
  { label: 'SOUNDCLOUD', url: '#' },
  { label: 'INSTAGRAM', url: '#' },
  { label: 'BEATPORT', url: '#' },
  { label: 'RESIDENT ADVISOR', url: '#' },
];

function toPerson(
  name: string,
  image: string | undefined,
  slug: string,
  overrides?: ArtistProfileOverrides
): Person {
  return {
    name,
    slug,
    image: overrides?.image ?? image,
    imageTopRight: overrides?.imageTopRight,
    imageBottomRight: overrides?.imageBottomRight,
    subtitle: overrides?.subtitle ?? 'GNOS / ASCETIC LIMITED',
    bio: overrides?.bio ?? DEFAULT_BIO,
    country: overrides?.country ?? 'RO',
    activeSince: overrides?.activeSince ?? '2018',
    labels: overrides?.labels ?? 'GNOS / ASCETIC',
    interview: overrides?.interview ?? DEFAULT_INTERVIEW,
    promoLinks: overrides?.promoLinks ?? DEFAULT_PROMO_LINKS,
  };
}

export function getFeaturedArtists(): Person[] {
  const release = sortedReleases.find((r) => r.slug === FEATURED_RELEASE_SLUG);
  const overrides = getArtistOverridesForRelease(FEATURED_RELEASE_SLUG);
  const artists = sortArtistsByName(release?.artists ?? []);
  return artists.map((a) => {
    const slug = nameToSlug(a.name);
    return toPerson(a.name, a.image, slug, overrides?.[slug]);
  });
}

export function getTeamMembers(): Person[] {
  return TEAM_MEMBERS;
}

export function getArtistBySlug(slug: string): Person | undefined {
  return getFeaturedArtists().find((p) => p.slug === slug);
}

export function getTeamMemberBySlug(slug: string): Person | undefined {
  return getTeamMembers().find((p) => p.slug === slug);
}
