import { sortedReleases } from '@/lib/releases';
import { ReleaseDatabaseItem } from '@/components/Releases/ReleaseDatabaseItem/ReleaseDatabaseItem';
import styles from './ReleasesPage.module.css';

const isUpcoming = (release: (typeof sortedReleases)[number]) =>
  release.releaseDate?.toUpperCase().includes('TBD') ?? false;

const allUpcoming = sortedReleases.filter(isUpcoming);
const upcomingReleases = allUpcoming.slice(0, 1);
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
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionTitle}>UPCOMING RELEASES</span>
                <div className={styles.sectionLine} />
              </div>
              <div className={styles.decorLines}>
                <div className={styles.glitchBar} />
                <div className={styles.glitchBar} style={{ '--delay': '0.2s' } as React.CSSProperties} />
                <div className={styles.glitchBar} style={{ '--delay': '0.4s' } as React.CSSProperties} />
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
                {upcomingReleases.map((release) => (
                  <ReleaseDatabaseItem key={release.slug} release={release} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CATALOG — only when there are catalog releases */}
        {catalogReleases.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionTitle}>CATALOG</span>
                <div className={styles.sectionLine} />
              </div>
              <div className={styles.decorLines}>
                <div className={styles.glitchBar} />
                <div className={styles.glitchBar} style={{ '--delay': '0.2s' } as React.CSSProperties} />
                <div className={styles.glitchBar} style={{ '--delay': '0.4s' } as React.CSSProperties} />
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
