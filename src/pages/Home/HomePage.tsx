import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';
import { catalogReleases } from '@/lib/releases';
import styles from './HomePage.module.css';

const SECTION_LINKS = [
  { label: 'LATEST RELEASES', path: ROUTE_PATHS.RELEASES, frame: '/svg/home/left-button.svg' },
  { label: 'UPCOMING RELEASES', path: ROUTE_PATHS.RELEASES, frame: '/svg/home/middle-button.svg' },
  { label: 'FEATURED ARTISTS', path: ROUTE_PATHS.TEAM, frame: '/svg/home/right-button.svg' },
] as const;

const HomePage = () => {
  const hasCatalog = catalogReleases.length > 0;

  return (
    <section className={styles.section}>
      {/* Hero: logo + tagline */}
      <div className={styles.hero}>
        <div className={styles.heroStack}>
          <div className={styles.logoFrame}>
            <img src="/svg/home/frame.svg" alt="" className={styles.frameSvg} aria-hidden />
            <div className={styles.logoInner}>
              <img src="/logo.svg" alt="GNOS" className={styles.logo} />
            </div>
          </div>
          <div className={styles.taglineFrame}>
            <img
              src="/svg/text-frame.svg"
              alt=""
              className={styles.textFrameSvg}
              aria-hidden
            />
            <span className={styles.tagline}>Doors to free souls</span>
          </div>
        </div>
      </div>

      {/* Below the fold: visible on scroll */}
      <div className={styles.belowHero}>
        <div className={styles.sectionLinksRow}>
          {SECTION_LINKS.map(({ label, path, frame }) => {
            const isDisabled = label === 'FEATURED ARTISTS' && !hasCatalog;
            return isDisabled ? (
              <span
                key={label}
                className={`${styles.sectionLinkFrame} ${styles.sectionLinkFrameDisabled}`}
                aria-disabled="true"
              >
                <img src={frame} alt="" className={styles.sectionLinkFrameSvg} aria-hidden />
                <span className={styles.sectionLinkText}>{label}</span>
              </span>
            ) : (
              <Link key={label} to={path} className={styles.sectionLinkFrame}>
                <img src={frame} alt="" className={styles.sectionLinkFrameSvg} aria-hidden />
                <span className={styles.sectionLinkText}>{label}</span>
              </Link>
            );
          })}
        </div>

        <div className={styles.mainDecoration} aria-hidden>
          <img
            src="/svg/home/mainpage-dec.svg"
            alt=""
            className={styles.mainDecorationSvg}
          />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
