import { Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown, { type Components } from 'react-markdown';
import { ROUTE_PATHS } from '@/constants/routes';
import { formatReleaseDate, getReleaseArtistsDisplayList, sortedReleases } from '@/lib/releases';
import { GnosArtistGallery } from '@/components/GnosArtistGallery/GnosArtistGallery';
import { BandcampEmbed } from '@/components/Releases/BandcampEmbed/BandcampEmbed';
import { ExternalLinks } from '@/components/Releases/ExternalLinks/ExternalLinks';
import styles from './ReleasePage.module.css';

const INFO_KEYS = [
  'title',
  'artist',
  'catalog',
  'release date',
  'format',
  'buy link',
  'mastering',
  'artwork',
] as const;

/** Wrap phrases in release MDX body: [[gnos]]highlighted text[[/gnos]] (supports *italic*, **bold** inside). */
const DESCRIPTION_GNOS = /\[\[gnos\]\]([\s\S]*?)\[\[\/gnos\]\]/g;

type DescriptionSegment =
  | { type: 'markdown'; body: string }
  | { type: 'gnos'; body: string };

function splitDescriptionByGnosMarkers(markdown: string): DescriptionSegment[] {
  const segments: DescriptionSegment[] = [];
  let lastIndex = 0;
  DESCRIPTION_GNOS.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = DESCRIPTION_GNOS.exec(markdown)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'markdown', body: markdown.slice(lastIndex, match.index) });
    }
    /* trimStart only: trailing space before [[/gnos]] separates the highlight from the next word */
    const inner = match[1].trimStart();
    if (inner.replace(/\s/g, '').length > 0) {
      segments.push({ type: 'gnos', body: inner });
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < markdown.length) {
    segments.push({ type: 'markdown', body: markdown.slice(lastIndex) });
  }
  return segments;
}

const gnosSegmentMarkdownComponents: Components = {
  p: ({ children }) => <span className={styles.descriptionGnos}>{children}</span>,
};

/** Markdown strips leading spaces at paragraph start (CommonMark) so they never separate [[gnos]] from the next word. */
function markdownBodyAfterGnos(
  segments: DescriptionSegment[],
  index: number,
  body: string,
): string {
  if (index === 0 || segments[index - 1]?.type !== 'gnos') {
    return body;
  }
  return body.replace(/^\s+/, '');
}

/** Space before [[gnos]] when authors use a new line; remark often drops a whitespace-only “gap” paragraph. */
function needsSpaceBeforeGnos(segments: DescriptionSegment[], index: number): boolean {
  return index > 0 && segments[index - 1]?.type === 'markdown';
}

/**
 * True when the markdown chunk before this [[gnos]] ends with a “new paragraph” in source:
 * blank line and/or whitespace-only line(s) before the tag (split removes the tag).
 */
function needsParagraphBreakBeforeGnos(segments: DescriptionSegment[], index: number): boolean {
  if (index === 0 || segments[index - 1]?.type !== 'markdown') {
    return false;
  }
  return /\n(?:\s*\n)+\s*$/.test(segments[index - 1].body);
}

function ReleaseDescription({ content }: { content: string }) {
  const segments = splitDescriptionByGnosMarkers(content);
  if (segments.length === 0) {
    return (
      <div className={styles.descriptionFlow}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  }
  return (
    <div className={styles.descriptionFlow}>
      {segments.map((seg, i) =>
        seg.type === 'markdown' ? (
          <Fragment key={i}>
            <ReactMarkdown>
              {markdownBodyAfterGnos(segments, i, seg.body)}
            </ReactMarkdown>
          </Fragment>
        ) : (
          <Fragment key={i}>
            {needsParagraphBreakBeforeGnos(segments, i) ? (
              <span className={styles.descriptionBlockSpacer} aria-hidden />
            ) : needsSpaceBeforeGnos(segments, i) ? (
              ' '
            ) : null}
            <ReactMarkdown components={gnosSegmentMarkdownComponents}>
              {seg.body}
            </ReactMarkdown>
            {i < segments.length - 1 ? ' ' : null}
          </Fragment>
        ),
      )}
    </div>
  );
}

const ReleasePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const release = sortedReleases.find((r) => r.slug === slug);
  const currentIndex = release ? sortedReleases.findIndex((r) => r.slug === slug) : -1;
  const prevRelease = currentIndex > 0 ? sortedReleases[currentIndex - 1] : null;
  const nextRelease = currentIndex >= 0 && currentIndex < sortedReleases.length - 1
    ? sortedReleases[currentIndex + 1]
    : null;

  if (!release) {
    return (
      <section className={styles.page}>
        <p className={styles.notFound}>Release not found.</p>
        <Link to={ROUTE_PATHS.RELEASES} className={styles.back}>
          ← Back to releases
        </Link>
      </section>
    );
  }

  const artistDisplay =
    release.type === 'va' ? 'VARIOUS' : (release.artist ?? '').toUpperCase();

  const getInfoValue = (key: (typeof INFO_KEYS)[number]): string => {
    switch (key) {
      case 'title':
        return release.title.toUpperCase();
      case 'artist':
        return artistDisplay;
      case 'catalog':
        return release.catalogNumber;
      case 'release date':
        return formatReleaseDate(release.releaseDate);
      case 'format':
        return (release.format ?? '').toUpperCase();
      case 'buy link':
        return '';
      case 'mastering':
        return (release.mastering ?? '').toUpperCase();
      case 'artwork':
        return (release.artwork ?? '').toUpperCase();
      default:
        return '';
    }
  };

  return (
    <article className={styles.page}>
      <Link to={ROUTE_PATHS.RELEASES} className={styles.back}>
        ← Releases
      </Link>

      <div className={styles.mainFrame}>
        <div className={styles.mainFrameContent}>
          {/* Top container: Entry ID (left) | Type (right) */}
          <div className={styles.topHeader}>
            <div className={styles.cornerFrame}>
              <div className={styles.corner} data-position="tl" aria-hidden />
              <div className={styles.corner} data-position="tr" aria-hidden />
              <div className={styles.corner} data-position="bl" aria-hidden />
              <div className={styles.corner} data-position="br" aria-hidden />
            </div>
            <div className={styles.topHeaderLeft}>
              <span className={styles.topLabel}>ENTRY ID</span>
              <span className={styles.topDivider} aria-hidden />
              <span className={styles.topValue}>{release.catalogNumber}</span>
            </div>
            <div className={styles.topHeaderRight}>
              <span className={styles.topLabel}>TYPE</span>
              <span className={styles.topDivider} aria-hidden />
              <span className={styles.topValue}>{release.type.toUpperCase()}</span>
            </div>
          </div>

          {/* Primary row: (info + description) matches Bandcamp panel height; featured + nav below */}
          <div className={styles.releaseBody}>
            <div className={styles.releasePrimary}>
              <div className={styles.releasePrimaryLeft}>
                <div className={`${styles.panel} ${styles.infoPanel}`}>
                  <div className={styles.cornerFrame}>
                    <div className={styles.corner} data-position="tl" aria-hidden />
                    <div className={styles.corner} data-position="tr" aria-hidden />
                    <div className={styles.corner} data-position="bl" aria-hidden />
                    <div className={styles.corner} data-position="br" aria-hidden />
                  </div>
                  <div className={styles.infoRows}>
                    {INFO_KEYS.map((key, i) => (
                      <div key={key} className={styles.infoRow}>
                        <span className={styles.infoLabel}>{key.toUpperCase()}:</span>
                        {key === 'buy link' ? (
                          release.bandcampUrl ? (
                            <a
                              href={release.bandcampUrl}
                              className={`${styles.infoValue} ${styles.infoBuyLink}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              BUY
                            </a>
                          ) : (
                            <span className={styles.infoValue} />
                          )
                        ) : (
                          <span className={styles.infoValue}>{getInfoValue(key)}</span>
                        )}
                        {i < INFO_KEYS.length - 1 && (
                          <div className={styles.infoDivider} aria-hidden />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${styles.panel} ${styles.descriptionPanel}`}>
                  <div className={styles.cornerFrame}>
                    <div className={styles.corner} data-position="tl" aria-hidden />
                    <div className={styles.corner} data-position="tr" aria-hidden />
                    <div className={styles.corner} data-position="bl" aria-hidden />
                    <div className={styles.corner} data-position="br" aria-hidden />
                  </div>
                  <div className={styles.descriptionBox}>
                    {release.content ? (
                      <ReleaseDescription content={release.content} />
                    ) : (
                      <span className={styles.placeholder} />
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.releasePrimaryRight}>
                {release.bandcampEmbedId ? (
                  <div className={styles.panel}>
                    <div className={styles.cornerFrame}>
                      <div className={styles.corner} data-position="tl" aria-hidden />
                      <div className={styles.corner} data-position="tr" aria-hidden />
                      <div className={styles.corner} data-position="bl" aria-hidden />
                      <div className={styles.corner} data-position="br" aria-hidden />
                    </div>
                    <div className={styles.bandcampHero}>
                      <BandcampEmbed release={release} />
                    </div>
                  </div>
                ) : (
                  <div className={styles.panel}>
                    <div className={styles.cornerFrame}>
                      <div className={styles.corner} data-position="tl" aria-hidden />
                      <div className={styles.corner} data-position="tr" aria-hidden />
                      <div className={styles.corner} data-position="bl" aria-hidden />
                      <div className={styles.corner} data-position="br" aria-hidden />
                    </div>
                    <div className={styles.coverSquare}>
                      <img
                        src={release.coverArt}
                        alt={`${release.title} cover`}
                        className={styles.cover}
                      />
                    </div>
                    {release.bandcampUrl ? (
                      <div className={styles.bandcampHero}>
                        <BandcampEmbed release={release} />
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>

            {release.type === 'va' && release.artists && release.artists.length > 0 ? (
              <div className={styles.featuredArtistsOnRelease}>
                <GnosArtistGallery
                  rootClassName={styles.featuredArtistsRoot}
                  galleryClassName={styles.featuredGalleryRow}
                  artists={getReleaseArtistsDisplayList(release)}
                />
              </div>
            ) : null}

            {prevRelease || nextRelease ? (
              <div className={styles.releaseNavSection}>
                <div className={styles.panel}>
                  <div className={styles.cornerFrame}>
                    <div className={styles.corner} data-position="tl" aria-hidden />
                    <div className={styles.corner} data-position="tr" aria-hidden />
                    <div className={styles.corner} data-position="bl" aria-hidden />
                    <div className={styles.corner} data-position="br" aria-hidden />
                  </div>
                  <div className={styles.releaseNav}>
                    <div className={styles.navPrev}>
                      {prevRelease ? (
                        <Link
                          to={`${ROUTE_PATHS.RELEASES}/${prevRelease.slug}`}
                          className={styles.navLink}
                        >
                          ← PREVIOUS RELEASE
                        </Link>
                      ) : null}
                    </div>
                    <div className={styles.navNext}>
                      {nextRelease ? (
                        <Link
                          to={`${ROUTE_PATHS.RELEASES}/${nextRelease.slug}`}
                          className={styles.navLink}
                        >
                          NEXT RELEASE →
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ReleasePage;
