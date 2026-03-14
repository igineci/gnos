import { sortedReleases } from '@/lib/releases';
import { ReleaseDatabaseItem } from '@/components/Releases/ReleaseDatabaseItem/ReleaseDatabaseItem';
import styles from './ReleasesPage.module.css';

const isUpcomingByDate = (release: (typeof sortedReleases)[number]) =>
  release.releaseDate?.toUpperCase().includes('TBD') ?? false;

/** Upcoming: ignorantia (by slug) plus any TBD-dated releases; not clickable, show "Coming soon" on hover */
const upcomingReleases = sortedReleases.filter(
  (r) => r.slug === 'ignorantia' || isUpcomingByDate(r)
);
const catalogReleases = sortedReleases.filter((r) => !upcomingReleases.includes(r));

const ReleasesPage = () => (
  <section className={styles.page}>
    <div className={styles.scanlineOverlay} aria-hidden />

    <div className={styles.mainFrame}>
      <div className={styles.mainFrameContent}>

        {/* UPCOMING RELEASES — only when there are upcoming releases */}
        {upcomingReleases.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>UPCOMING RELEASES</span>
              <div className={styles.sectionLineSeparator} aria-hidden>
                <img src="/svg/line-separator.svg" alt="" className={styles.lineSeparatorSvg} />
              </div>
            </div>
            <div className={styles.releaseListWrapper}>
              <div className={styles.cornerFrame}>
                <div className={styles.corner} data-position="tl" aria-hidden />
                <div className={styles.corner} data-position="tr" aria-hidden />
                <div className={styles.corner} data-position="bl" aria-hidden />
                <div className={styles.corner} data-position="br" aria-hidden />
              </div>
              <div className={styles.releaseList} role="list">
                {upcomingReleases.map((release) => (
                  <ReleaseDatabaseItem
                    key={release.slug}
                    release={release}
                    comingSoon
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CATALOG — only when there are catalog releases */}
        {catalogReleases.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>CATALOG</span>
              <div className={styles.sectionLineSeparator} aria-hidden>
                <img src="/svg/line-separator.svg" alt="" className={styles.lineSeparatorSvg} />
              </div>
            </div>
            <div className={styles.releaseListWrapper}>
              <div className={styles.cornerFrame}>
                <div className={styles.corner} data-position="tl" aria-hidden />
                <div className={styles.corner} data-position="tr" aria-hidden />
                <div className={styles.corner} data-position="bl" aria-hidden />
                <div className={styles.corner} data-position="br" aria-hidden />
              </div>
              <div className={styles.releaseList}>
                {catalogReleases.map((release) => (
                  <ReleaseDatabaseItem key={release.slug} release={release} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default ReleasesPage;
