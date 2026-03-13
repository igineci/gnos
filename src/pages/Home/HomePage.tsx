import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';
import styles from './HomePage.module.css';

const SECTION_LINKS = [
  { label: 'LATEST RELEASES', path: ROUTE_PATHS.RELEASES, frame: '/svg/home/left-button.svg' },
  { label: 'UPCOMING RELEASES', path: ROUTE_PATHS.RELEASES, frame: '/svg/home/middle-button.svg' },
  { label: 'FEATURED ARTISTS', path: ROUTE_PATHS.TEAM, frame: '/svg/home/right-button.svg' },
] as const;

const HomePage = () => (
  <section className={styles.section}>
    <div className={styles.scanlineOverlay} aria-hidden />

    <div className={styles.stack}>
      {/* Top: Logo inside frame SVG */}
      <div className={styles.logoFrame}>
        <img src="/svg/home/frame.svg" alt="" className={styles.frameSvg} aria-hidden />
        <div className={styles.logoInner}>
          <img src="/logo.svg" alt="GNOS" className={styles.logo} />
        </div>
      </div>

      {/* Tagline: text-frame.svg as frame, sentence in center channel */}
      <div className={styles.taglineFrame}>
        <img
          src="/svg/text-frame.svg"
          alt=""
          className={styles.textFrameSvg}
          aria-hidden
        />
        <span className={styles.tagline}>Doors to free souls</span>
      </div>

      {/* 3 section links with frame SVGs */}
      <div className={styles.sectionLinksRow}>
        {SECTION_LINKS.map(({ label, path, frame }) => (
          <Link key={label} to={path} className={styles.sectionLinkFrame}>
            <img src={frame} alt="" className={styles.sectionLinkFrameSvg} aria-hidden />
            <span className={styles.sectionLinkText}>{label}</span>
          </Link>
        ))}
      </div>

      {/* Bottom 2: Glitch + Waveform */}
      <div className={styles.bottomRow}>
        <div className={`${styles.panel} ${styles.panelGlitch}`}>
          <div className={styles.cornerFrame}>
            <div className={styles.corner} data-position="tl" />
            <div className={styles.corner} data-position="tr" />
            <div className={styles.corner} data-position="bl" />
            <div className={styles.corner} data-position="br" />
          </div>
          <div className={styles.glitchPattern}>
            <div className={styles.glitchBar} />
            <div className={styles.glitchBar} style={{ '--delay': '0.2s' } as React.CSSProperties} />
            <div className={styles.glitchBar} style={{ '--delay': '0.4s' } as React.CSSProperties} />
          </div>
        </div>

        <div className={`${styles.panel} ${styles.panelWaveform}`}>
          <div className={styles.cornerFrame}>
            <div className={styles.corner} data-position="tl" />
            <div className={styles.corner} data-position="tr" />
            <div className={styles.corner} data-position="bl" />
            <div className={styles.corner} data-position="br" />
          </div>
          <div className={styles.waveform}>
            <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.waveformSvg}>
              <path
                d="M0 30 Q25 10 50 30 T100 30 T150 30 T200 30"
                stroke="currentColor"
                strokeWidth="0.8"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M0 35 Q30 50 60 35 T120 35 T180 35"
                stroke="currentColor"
                strokeWidth="0.6"
                fill="none"
                opacity="0.5"
              />
              <path
                d="M0 25 Q40 45 80 25 T160 25"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                opacity="0.4"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HomePage;
