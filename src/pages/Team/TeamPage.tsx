import { getFeaturedArtists, getTeamMembers } from '@/data/gnos';
import styles from './TeamPage.module.css';

const TeamPage = () => {
  const featuredArtists = getFeaturedArtists();
  const teamMembers = getTeamMembers();

  return (
    <section className={styles.page}>
      <div className={styles.scanlineOverlay} aria-hidden />

      <div className={styles.mainFrame}>
        <div className={styles.mainFrameContent}>

          {/* Featured Artists — grid of images in cover frame */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionTitle}>FEATURED ARTISTS</span>
                <div className={styles.sectionLine} />
              </div>
              <div className={styles.decorLines}>
                <div className={styles.glitchBar} />
                <div className={styles.glitchBar} style={{ '--delay': '0.2s' } as React.CSSProperties} />
                <div className={styles.glitchBar} style={{ '--delay': '0.4s' } as React.CSSProperties} />
              </div>
            </div>
            <div className={styles.listWrapper}>
              <div className={styles.cornerFrame}>
                <div className={styles.corner} data-position="tl" aria-hidden />
                <div className={styles.corner} data-position="tr" aria-hidden />
                <div className={styles.corner} data-position="bl" aria-hidden />
                <div className={styles.corner} data-position="br" aria-hidden />
              </div>
              <div className={styles.galleryGrid}>
                {featuredArtists.length > 0 ? (
                  featuredArtists.map((artist) => (
                    <div key={artist.name} className={styles.galleryItem} title={artist.name}>
                      <div className={styles.galleryArtwork}>
                        <img
                          src="/svg/releases/cover-frame.svg"
                          alt=""
                          className={styles.coverFrame}
                          aria-hidden
                        />
                        {artist.image ? (
                          <img
                            src={artist.image}
                            alt={artist.name}
                            className={styles.coverImage}
                          />
                        ) : (
                          <div className={styles.coverPlaceholder} aria-hidden />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.emptyState}>No featured artists yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Meet the Team — grid of images in cover frame */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionTitle}>MEET THE TEAM</span>
                <div className={styles.sectionLine} />
              </div>
              <div className={styles.decorLines}>
                <div className={styles.glitchBar} />
                <div className={styles.glitchBar} style={{ '--delay': '0.2s' } as React.CSSProperties} />
                <div className={styles.glitchBar} style={{ '--delay': '0.4s' } as React.CSSProperties} />
              </div>
            </div>
            <div className={styles.listWrapper}>
              <div className={styles.cornerFrame}>
                <div className={styles.corner} data-position="tl" aria-hidden />
                <div className={styles.corner} data-position="tr" aria-hidden />
                <div className={styles.corner} data-position="bl" aria-hidden />
                <div className={styles.corner} data-position="br" aria-hidden />
              </div>
              <div className={styles.galleryGrid}>
                {teamMembers.length > 0 ? (
                  teamMembers.map((member) => (
                    <div key={member.name} className={styles.galleryItem} title={member.name}>
                      <div className={styles.galleryArtwork}>
                        <img
                          src="/svg/releases/cover-frame.svg"
                          alt=""
                          className={styles.coverFrame}
                          aria-hidden
                        />
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className={styles.coverImage}
                          />
                        ) : (
                          <div className={styles.coverPlaceholder} aria-hidden />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.emptyState}>No team members yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPage;
