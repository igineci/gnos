import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ROUTE_PATHS } from '@/constants/routes';
import { formatReleaseDate, sortedReleases } from '@/lib/releases';
import { TrackPlayer } from '@/components/Releases/TrackPlayer/TrackPlayer';
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
        return release.bandcampUrl ?? '';
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
      <div className={styles.scanlineOverlay} aria-hidden />

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

      {/* Main grid: left (info + description) | right (cover + player + nav) */}
      <div className={styles.mainGrid}>
        {/* Left column */}
        <div className={styles.leftColumn}>
          {/* Info container */}
          <div className={styles.panel}>
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
                  <span className={styles.infoValue}>{getInfoValue(key)}</span>
                  {i < INFO_KEYS.length - 1 && (
                    <div className={styles.infoDivider} aria-hidden />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Description container */}
          <div className={`${styles.panel} ${styles.descriptionPanel}`}>
            <div className={styles.cornerFrame}>
              <div className={styles.corner} data-position="tl" aria-hidden />
              <div className={styles.corner} data-position="tr" aria-hidden />
              <div className={styles.corner} data-position="bl" aria-hidden />
              <div className={styles.corner} data-position="br" aria-hidden />
            </div>
            <div className={styles.descriptionBox}>
              {release.content ? (
                <ReactMarkdown>{release.content}</ReactMarkdown>
              ) : (
                <span className={styles.placeholder} />
              )}
            </div>
          </div>

          {/* Artists (VA releases) */}
          {release.type === 'va' && release.artists && release.artists.length > 0 && (
            <div className={styles.artistsPanel}>
              <div className={styles.cornerFrame}>
                <div className={styles.corner} data-position="tl" aria-hidden />
                <div className={styles.corner} data-position="tr" aria-hidden />
                <div className={styles.corner} data-position="bl" aria-hidden />
                <div className={styles.corner} data-position="br" aria-hidden />
              </div>
              <div className={styles.artistsHeader}>
                <span className={styles.artistsHeaderLine} aria-hidden />
                <h3 className={styles.artistsHeaderTitle}>= FEATURED ARTISTS =</h3>
                <span className={styles.artistsHeaderLine} aria-hidden />
              </div>
              <div className={styles.artistsGrid}>
                {release.artists.map((artist) => (
                  <div key={artist.name} className={styles.artistCard}>
                    {artist.image && (
                      <div className={styles.artistPortrait}>
                        <div className={styles.artistPortraitScanlines} aria-hidden />
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className={styles.artistImage}
                        />
                      </div>
                    )}
                    <div className={styles.artistDivider} aria-hidden />
                    <span className={styles.artistName}>{artist.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className={styles.rightColumn}>
          {/* Cover art container */}
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
          </div>

          {/* Music player (single) */}
          <div className={styles.panel}>
            <div className={styles.cornerFrame}>
              <div className={styles.corner} data-position="tl" aria-hidden />
              <div className={styles.corner} data-position="tr" aria-hidden />
              <div className={styles.corner} data-position="bl" aria-hidden />
              <div className={styles.corner} data-position="br" aria-hidden />
            </div>
            {(release.bandcampEmbedId || release.bandcampUrl) ? (
              <BandcampEmbed release={release} />
            ) : (
              <TrackPlayer release={release} />
            )}
          </div>

          {/* Prev / Next release nav */}
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
      </div>

      <ExternalLinks release={release} />
        </div>
      </div>
    </article>
  );
};

export default ReleasePage;
