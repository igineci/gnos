import { useState } from 'react';
import type { Release } from 'content-collections';
import styles from './TrackPlayer.module.css';

interface TrackPlayerProps {
  release: Release;
}

const PLACEHOLDER_TRACKS = 6;

function getTracks(release: Release): { title: string; artist?: string; duration?: string }[] {
  const tracklist = release.tracklist ?? [];
  const result = [...tracklist];
  while (result.length < PLACEHOLDER_TRACKS) {
    const i = result.length + 1;
    result.push({
      title: `Track ${String(i).padStart(2, '0')}`,
      artist: '',
      duration: '--:--',
    });
  }
  return result.slice(0, PLACEHOLDER_TRACKS);
}

export const TrackPlayer = ({ release }: TrackPlayerProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const tracks = getTracks(release);
  const showArtist = release.type === 'va';

  return (
    <div className={styles.wrap}>
      <h3 className={styles.heading}>Listen</h3>
      <div className={`${styles.player} ${isPlaying ? styles.playing : ''}`}>
        {/* Playback controls + waveform area */}
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.playBtn}
            onClick={() => {
              setIsPlaying(!isPlaying);
              if (activeIndex === null) setActiveIndex(0);
            }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <span className={styles.playIcon}>{isPlaying ? '‖' : '▶'}</span>
          </button>
          <div className={styles.waveform}>
            <div className={styles.waveformBars}>
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={i}
                  className={styles.bar}
                  style={{
                    height: `${20 + Math.sin(i * 0.8) * 30}%`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
            <div
              className={styles.progress}
              style={{ width: isPlaying ? '45%' : '0%' }}
            />
          </div>
        </div>

        {/* Track list */}
        <ol className={styles.trackList}>
          {tracks.map((track, i) => (
            <li
              key={i}
              className={`${styles.track} ${showArtist ? styles.va : ''} ${activeIndex === i ? styles.active : ''}`}
              onClick={() => {
                setActiveIndex(i);
                setIsPlaying(true);
              }}
            >
              <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.title}>{track.title}</span>
              {showArtist && (
                <span className={styles.artist}>{track.artist ?? '—'}</span>
              )}
              <span className={styles.duration}>{track.duration ?? '--:--'}</span>
            </li>
          ))}
        </ol>

        <p className={styles.placeholderNote}>Bandcamp player coming soon</p>
      </div>
    </div>
  );
};
