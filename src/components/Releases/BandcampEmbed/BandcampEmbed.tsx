import type { Release } from 'content-collections';
import styles from './BandcampEmbed.module.css';

interface BandcampEmbedProps {
  release: Release;
}

export const BandcampEmbed = ({ release }: BandcampEmbedProps) => {
  const { bandcampEmbedId, bandcampUrl } = release;

  if (!bandcampEmbedId && !bandcampUrl) return null;

  if (bandcampEmbedId) {
    return (
      <div className={styles.wrap}>
        <iframe
          className={styles.embed}
          src={`https://bandcamp.com/EmbeddedPlayer/album=${bandcampEmbedId}/size=large/tracklist=true/bgcol=333333/linkcol=ffffff/transparent=true/`}
          seamless
          title={`Listen to ${release.title} on Bandcamp`}
        />
      </div>
    );
  }

  if (bandcampUrl) {
    return (
      <div className={styles.wrap}>
        <a
          href={bandcampUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Open on Bandcamp
        </a>
      </div>
    );
  }

  return null;
};
