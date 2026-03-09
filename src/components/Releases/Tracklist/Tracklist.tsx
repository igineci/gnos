import type { Release } from 'content-collections';
import styles from './Tracklist.module.css';

interface TracklistProps {
  release: Release;
}

export const Tracklist = ({ release }: TracklistProps) => {
  const { tracklist, type } = release;
  const showArtist = type === 'va';

  if (!tracklist?.length) return null;

  return (
    <div className={styles.wrap}>
      <h3 className={styles.heading}>Tracklist</h3>
      <ol className={styles.list}>
        {tracklist.map((track, i) => (
          <li
            key={i}
            className={`${styles.track} ${showArtist ? styles.va : ''}`}
          >
            <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.title}>{track.title}</span>
            {showArtist && (
              <span className={styles.artist}>{track.artist}</span>
            )}
            {track.duration && (
              <span className={styles.duration}>{track.duration}</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};
