import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';
import type { Release } from 'content-collections';
import styles from './ReleaseCard.module.css';

interface ReleaseCardProps {
  release: Release;
}

export const ReleaseCard = ({ release }: ReleaseCardProps) => {
  const artistDisplay =
    release.type === 'album'
      ? release.artist
      : release.artists?.map((a) => a.name).join(', ') ?? '';

  const typeClass = release.type === 'album' ? styles.album : styles.va;

  return (
    <Link
      to={`${ROUTE_PATHS.RELEASES}/${release.slug}`}
      className={`${styles.card} ${typeClass}`}
      aria-label={`View release: ${release.title}`}
    >
      <div className={styles.coverWrap}>
        <img
          src={release.coverArt}
          alt={`${release.title} cover`}
          className={styles.cover}
        />
        <div className={styles.grain} aria-hidden />
        <div className={styles.overlay}>
          <span className={styles.title}>{release.title}</span>
          {artistDisplay && (
            <span className={styles.artist}>{artistDisplay}</span>
          )}
        </div>
      </div>
      <span className={styles.catalog}>{release.catalogNumber}</span>
    </Link>
  );
};
