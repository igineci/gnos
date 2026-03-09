import type { Release } from 'content-collections';
import styles from './BandcampEmbed.module.css';

interface BandcampEmbedProps {
  release: Release;
}

export const BandcampEmbed = ({ release }: BandcampEmbedProps) => {
  const { bandcampEmbedId, bandcampUrl } = release;

  if (!bandcampEmbedId && !bandcampUrl) return null;

  /* When Bandcamp is ready: use embed iframe. For now show placeholder. */
  if (bandcampEmbedId) {
    return (
      <div className={styles.wrap}>
        <h3 className={styles.heading}>Listen</h3>
        <iframe
          className={styles.embed}
          src={`https://bandcamp.com/EmbeddedPlayer/album=${bandcampEmbedId}/size=large/bgcol=000000/linkcol=08595E/artwork=small/transparent=true/`}
          seamless
          title={`Listen to ${release.title} on Bandcamp`}
        />
      </div>
    );
  }

  if (bandcampUrl) {
    return (
      <div className={styles.wrap}>
        <h3 className={styles.heading}>Listen</h3>
        <a
          href={bandcampUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Bandcamp — coming soon
        </a>
      </div>
    );
  }

  return null;
};
