import { Link, useSearchParams } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';
import type { Release } from 'content-collections';
import { formatReleaseDate, getArtistDisplay } from '@/lib/releases';
import styles from './ReleaseDatabaseItem.module.css';

export interface ReleaseDatabaseItemProps {
  release: Release;
  /** Upcoming release: not clickable, hover shows "Coming soon" (coming-soon-hover.svg) */
  comingSoon?: boolean;
}

export const ReleaseDatabaseItem = ({ release, comingSoon = false }: ReleaseDatabaseItemProps) => {
  const [searchParams] = useSearchParams();
  const forceHover = searchParams.get('forceHover') === '1';
  const artistDisplay = getArtistDisplay(release, 'short');
  const dateLabel = formatReleaseDate(release.releaseDate);

  const content = (
    <>
      <div className={styles.artwork}>
        <img
          src="/svg/releases/cover-frame.svg"
          alt=""
          className={styles.coverFrame}
          aria-hidden
        />
        <img
          src={release.coverArt}
          alt={`${release.title} cover`}
          className={styles.cover}
        />
      </div>
      <div className={styles.details}>
        <span className={styles.title}>{release.title}</span>
        {artistDisplay && (
          <span className={styles.artist}>{artistDisplay}</span>
        )}
        <span className={styles.date}>{dateLabel}</span>
      </div>
      {comingSoon && (
        <div className={styles.hoverOverlay} aria-hidden>
          <img
            src="/svg/coming-soon-hover.svg"
            alt=""
            className={styles.hoverSvg}
          />
          <span className={styles.hoverLabel}>COMING SOON</span>
        </div>
      )}
    </>
  );

  if (comingSoon) {
    return (
      <div
        className={styles.item}
        role="listitem"
        aria-disabled="true"
        aria-label={`Upcoming release: ${release.title}`}
        data-upcoming
        data-force-hover={forceHover ? '' : undefined}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      to={`${ROUTE_PATHS.RELEASES}/${release.slug}`}
      className={styles.item}
      aria-label={`View release: ${release.title}`}
    >
      {content}
    </Link>
  );
};
