import { Link } from 'react-router-dom';
import { allReleases } from 'content-collections';
import { ROUTE_PATHS } from '@/constants/routes';
import type { Release } from 'content-collections';
import styles from './RelatedReleases.module.css';

interface RelatedReleasesProps {
  currentSlug: string;
}

export const RelatedReleases = ({ currentSlug }: RelatedReleasesProps) => {
  const others = allReleases.filter((r) => r.slug !== currentSlug);

  if (others.length === 0) return null;

  return (
    <div className={styles.wrap}>
      <h3 className={styles.heading}>More Releases</h3>
      <div className={styles.grid}>
        {others.map((release) => (
          <Link
            key={release.slug}
            to={`${ROUTE_PATHS.RELEASES}/${release.slug}`}
            className={styles.card}
          >
            <img
              src={release.coverArt}
              alt=""
              className={styles.cover}
              loading="lazy"
            />
            <span className={styles.title}>{release.title}</span>
            <span className={styles.catalog}>{release.catalogNumber}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
