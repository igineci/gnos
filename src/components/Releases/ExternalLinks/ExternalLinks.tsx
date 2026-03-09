import type { Release } from 'content-collections';
import styles from './ExternalLinks.module.css';

interface ExternalLinksProps {
  release: Release;
}

const ICONS = {
  bandcamp: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path
        fill="currentColor"
        d="M0 18.75l7.437-13.5 24 13.5L24 24 0 24z"
      />
    </svg>
  ),
  soundcloud: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path
        fill="currentColor"
        d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 1.831c-.007.058.04.11.1.11h.67c.06 0 .11-.052.1-.11l-.24-1.831c-.006-.054-.05-.1-.1-.1m-.67 2.732c-.06 0-.11.052-.1.11l.13 1.002c.01.058.06.11.12.11h.67c.06 0 .11-.052.1-.11l-.13-1.002c-.01-.058-.06-.11-.12-.11m1.44-2.64c-.06 0-.11.05-.12.11l-.28 2.19c-.01.06.04.11.11.11h.67c.06 0 .11-.05.12-.11l.27-2.19c.01-.06-.04-.11-.11-.11m-.56 2.19l-.13 1.002c-.01.058.04.11.11.11h.67c.06 0 .11-.052.12-.11l.13-1.002c.01-.058-.04-.11-.11-.11m1.63-2.19c-.06 0-.11.05-.12.11l-.3 2.19c-.01.06.04.11.11.11h.67c.06 0 .11-.05.12-.11l.3-2.19c.01-.06-.04-.11-.11-.11m-.56 2.19l-.13 1.002c-.01.058.04.11.11.11h.67c.06 0 .11-.052.12-.11l.13-1.002c.01-.058-.04-.11-.11-.11m1.62-2.19c-.06 0-.11.05-.12.11l-.31 2.19c-.01.06.04.11.11.11h.67c.06 0 .11-.05.12-.11l.31-2.19c.01-.06-.04-.11-.11-.11m-.56 2.19l-.13 1.002c-.01.058.04.11.11.11h.67c.06 0 .11-.052.12-.11l.13-1.002c.01-.058-.04-.11-.11-.11m1.62-2.19c-.06 0-.11.05-.12.11l-.31 2.19c-.01.06.04.11.11.11h.67c.06 0 .11-.05.12-.11l.31-2.19c.01-.06-.04-.11-.11-.11m-.56 2.19l-.13 1.002c-.01.058.04.11.11.11h.67c.06 0 .11-.052.12-.11l.13-1.002c.01-.058-.04-.11-.11-.11m1.63-2.19c-.06 0-.11.05-.12.11l-.31 2.19c-.01.06.04.11.11.11h.67c.06 0 .11-.05.12-.11l.31-2.19c.01-.06-.04-.11-.11-.11m-.56 2.19l-.13 1.002c-.01.058.04.11.11.11h.67c.06 0 .11-.052.12-.11l.13-1.002c.01-.058-.04-.11-.11-.11m1.62-2.19c-.06 0-.11.05-.12.11l-.31 2.19c-.01.06.04.11.11.11h.67c.06 0 .11-.05.12-.11l.31-2.19c.01-.06-.04-.11-.11-.11m-.56 2.19l-.13 1.002c-.01.058.04.11.11.11h.67c.06 0 .11-.052.12-.11l.13-1.002c.01-.058-.04-.11-.11-.11m1.63-2.19c-.06 0-.11.05-.12.11l-.31 2.19c-.01.06.04.11.11.11h.67c.06 0 .11-.05.12-.11l.31-2.19c.01-.06-.04-.11-.11-.11m-.56 2.19l-.13 1.002c-.01.058.04.11.11.11h.67c.06 0 .11-.052.12-.11l.13-1.002c.01-.058-.04-.11-.11-.11"
      />
    </svg>
  ),
  spotify: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path
        fill="currentColor"
        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.621 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
      />
    </svg>
  ),
  beatport: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4l-3 2 3 2zm1 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-14c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8z"
      />
    </svg>
  ),
};

export const ExternalLinks = ({ release }: ExternalLinksProps) => {
  const links: { href: string; label: string; icon: keyof typeof ICONS }[] = [];

  if (release.bandcampUrl) {
    links.push({
      href: release.bandcampUrl,
      label: 'Bandcamp',
      icon: 'bandcamp',
    });
  }
  if (release.soundcloudUrl) {
    links.push({
      href: release.soundcloudUrl,
      label: 'SoundCloud',
      icon: 'soundcloud',
    });
  }
  if (release.spotifyUrl) {
    links.push({
      href: release.spotifyUrl,
      label: 'Spotify',
      icon: 'spotify',
    });
  }
  if (release.beatportUrl) {
    links.push({
      href: release.beatportUrl,
      label: 'Beatport',
      icon: 'beatport',
    });
  }

  if (links.length === 0) return null;

  return (
    <div className={styles.wrap}>
      <h3 className={styles.heading}>Links</h3>
      <div className={styles.links}>
        {links.map(({ href, label, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            aria-label={label}
          >
            {ICONS[icon]}
            <span>{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
