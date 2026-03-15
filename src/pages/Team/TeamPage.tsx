import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedArtists, getTeamMembers } from '@/data/gnos';
import { catalogReleases } from '@/lib/releases';
import styles from './TeamPage.module.css';

const TeamPage = () => {
  const featuredArtists = getFeaturedArtists();
  const teamMembers = getTeamMembers();
  const showFeaturedArtists = catalogReleases.length > 0;
  const mainFrameContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = mainFrameContentRef.current;

    if (!root) {
      return undefined;
    }

    const nameNodes = Array.from(
      root.querySelectorAll<HTMLElement>('[data-hover-name]'),
    );
    const triggerNodes = Array.from(
      root.querySelectorAll<HTMLElement>('[data-hover-trigger]'),
    );
    let frameId = 0;

    const fitHoverName = (node: HTMLElement) => {
      const parent = node.parentElement;

      if (!parent) {
        return;
      }

      const parentStyles = window.getComputedStyle(parent);
      const horizontalPadding =
        Number.parseFloat(parentStyles.paddingLeft) +
        Number.parseFloat(parentStyles.paddingRight);
      const maxWidth = Math.max(parent.clientWidth - horizontalPadding - 8, 0);

      if (!maxWidth) {
        return;
      }

      const computedStyles = window.getComputedStyle(node);
      const storedBaseFontSize = Number.parseFloat(node.dataset.baseFontSize ?? '');
      const baseFontSize = storedBaseFontSize || Number.parseFloat(computedStyles.fontSize);

      if (!baseFontSize) {
        return;
      }

      if (!storedBaseFontSize) {
        node.dataset.baseFontSize = `${baseFontSize}`;
      }

      node.style.fontSize = `${baseFontSize}px`;

      const previousWidth = node.style.width;
      const previousMaxWidth = node.style.maxWidth;
      node.style.width = 'max-content';
      node.style.maxWidth = 'none';

      const contentWidth = node.getBoundingClientRect().width || node.scrollWidth;

      node.style.width = previousWidth;
      node.style.maxWidth = previousMaxWidth;

      if (!contentWidth || contentWidth <= maxWidth) {
        return;
      }

      const scaledFontSize = Math.max(8, baseFontSize * (maxWidth / contentWidth));
      node.style.fontSize = `${scaledFontSize}px`;
    };

    const fitHoverNames = () => {
      nameNodes.forEach(fitHoverName);
    };

    const scheduleFitHoverNames = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(fitHoverNames);
    };

    scheduleFitHoverNames();
    const resizeObserver = new ResizeObserver(fitHoverNames);

    resizeObserver.observe(root);
    nameNodes.forEach((node) => {
      resizeObserver.observe(node);
      if (node.parentElement) {
        resizeObserver.observe(node.parentElement);
      }
    });

    triggerNodes.forEach((node) => {
      node.addEventListener('pointerenter', scheduleFitHoverNames);
      node.addEventListener('focusin', scheduleFitHoverNames);
    });

    void document.fonts?.ready.then(scheduleFitHoverNames);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      triggerNodes.forEach((node) => {
        node.removeEventListener('pointerenter', scheduleFitHoverNames);
        node.removeEventListener('focusin', scheduleFitHoverNames);
      });
    };
  }, [featuredArtists, teamMembers]);

  return (
    <section className={styles.page}>
      <div className={styles.scanlineOverlay} aria-hidden />

      <div className={styles.mainFrame}>
        <div ref={mainFrameContentRef} className={styles.mainFrameContent}>

          {/* Featured Artists — only when catalog has releases */}
          {showFeaturedArtists && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>FEATURED ARTISTS</span>
              <div className={styles.sectionLineSeparator} aria-hidden>
                <img src="/svg/line-separator.svg" alt="" className={styles.lineSeparatorSvg} />
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
                    <Link
                      key={artist.slug}
                      to={`/artist/${artist.slug}`}
                      className={styles.galleryItem}
                      title={artist.name}
                      data-hover-trigger
                    >
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
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className={styles.coverPlaceholder} aria-hidden />
                        )}
                      </div>
                      <div className={styles.hoverOverlay} aria-hidden>
                        <img
                          src="/svg/coming-soon-hover.svg"
                          alt=""
                          className={styles.hoverSvg}
                        />
                        <div className={`${styles.hoverText} ${styles.hoverTextArtist}`}>
                          <span className={styles.hoverName} data-hover-name>{artist.name}</span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className={styles.emptyState}>No featured artists yet.</p>
                )}
              </div>
            </div>
          </div>
          )}

          {/* Meet the Team — grid of images in cover frame */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>MEET THE TEAM</span>
              <div className={styles.sectionLineSeparator} aria-hidden>
                <img src="/svg/line-separator.svg" alt="" className={styles.lineSeparatorSvg} />
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
                    <Link
                      key={member.slug}
                      to={`/team/${member.slug}`}
                      className={styles.galleryItem}
                      title={member.name}
                      data-hover-trigger
                    >
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
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className={styles.coverPlaceholder} aria-hidden />
                        )}
                      </div>
                      <div className={styles.hoverOverlay} aria-hidden>
                        <img
                          src="/svg/coming-soon-hover.svg"
                          alt=""
                          className={styles.hoverSvg}
                        />
                        <div className={`${styles.hoverText} ${styles.hoverTextTeam}`}>
                          <span className={styles.hoverName} data-hover-name>{member.name}</span>
                          {member.role && (
                            <span className={styles.hoverRole}>{member.role}</span>
                          )}
                        </div>
                      </div>
                    </Link>
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
