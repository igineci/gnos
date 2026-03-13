import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';
import type { Release } from 'content-collections';
import { formatReleaseDate, getArtistDisplay } from '@/lib/releases';
import styles from './ReleaseDatabaseItem.module.css';

interface ReleaseDatabaseItemProps {
  release: Release;
}

export const ReleaseDatabaseItem = ({ release }: ReleaseDatabaseItemProps) => {
  const artistDisplay = getArtistDisplay(release, 'short');
  const dateLabel = formatReleaseDate(release.releaseDate);

  return (
    <Link
      to={`${ROUTE_PATHS.RELEASES}/${release.slug}`}
      className={styles.item}
      aria-label={`View release: ${release.title}`}
    >
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
    </Link>
  );
};
