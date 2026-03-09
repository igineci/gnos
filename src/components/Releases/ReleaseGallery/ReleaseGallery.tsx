import { allReleases } from 'content-collections';
import { ReleaseCard } from '@/components/Releases/ReleaseCard/ReleaseCard';
import styles from './ReleaseGallery.module.css';

export const ReleaseGallery = () => (
  <div className={styles.gallery}>
    {allReleases.map((release) => (
      <ReleaseCard key={release.slug} release={release} />
    ))}
  </div>
);
