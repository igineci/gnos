/** Person / artist types and slug helper */

export type InterviewAnswerSegment = {
  text: string;
  /** Inline GNOS turquoise */
  accent?: boolean;
};

/** One `<p>`: either a single `text` or multiple inline `parts` */
export type InterviewAnswerParagraph =
  | { text: string; accent?: boolean; parts?: never }
  | { parts: InterviewAnswerSegment[]; text?: never; accent?: never };

export type InterviewQAItem = {
  q: string;
  /** Plain string (auto-split into readable paragraphs) or explicit blocks */
  a: string | InterviewAnswerParagraph[];
};

export type Person = {
  name: string;
  slug: string;
  image?: string;
  /** Optional separate image for top-right slot; falls back to image if not set. */
  imageTopRight?: string;
  /** Optional separate image for bottom-right slot; falls back to image if not set. */
  imageBottomRight?: string;
  subtitle?: string;
  bio?: string | string[];
  country?: string;
  activeSince?: string;
  labels?: string;
  /** One block = one paragraph; optional `accent` = GNOS turquoise line. */
  interview?: InterviewQAItem[];
  /** Role/title for team members; not used for artists. */
  role?: string;
  promoLinks?: { label: string; url: string }[];
};

export type GnosArtist = Pick<Person, 'name' | 'image'>;

/** Rich artist fields merged in `toPerson` for a given release catalog entry. */
export type ArtistProfileOverrides = Partial<
  Pick<
    Person,
    | 'image'
    | 'imageTopRight'
    | 'imageBottomRight'
    | 'subtitle'
    | 'bio'
    | 'interview'
    | 'activeSince'
    | 'country'
    | 'labels'
    | 'promoLinks'
  >
>;

export type ReleaseArtistOverridesMap = Partial<
  Record<string, ArtistProfileOverrides>
>;

/** Slug-friendly string from display name */
export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
