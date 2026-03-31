import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GnosArtistGallery } from '@/components/GnosArtistGallery/GnosArtistGallery';
import { getFeaturedArtists, getTeamMembers } from '@/data/gnos';
import { catalogReleases } from '@/lib/releases';
import styles from './TeamPage.module.css';

const TeamPage = () => {
  const featuredArtists = getFeaturedArtists();
  const teamMembers = getTeamMembers();
  const showFeaturedArtists = catalogReleases.length > 0;
  const teamGalleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = teamGalleryRef.current;

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

    const setHoverSide = (node: HTMLElement) => {
      if (window.innerWidth <= 767) {
        delete node.dataset.hoverSide;
        return;
      }

      const overlay = node.querySelector<HTMLElement>(`.${styles.hoverOverlay}`);

      if (!overlay) {
        return;
      }

      delete node.dataset.hoverSide;

      const triggerRect = node.getBoundingClientRect();
      const overlayWidth = overlay.getBoundingClientRect().width;

      if (!overlayWidth) {
        return;
      }

      const viewportPadding = 16;
      const defaultRightEdge = triggerRect.left + triggerRect.width * 0.76 + overlayWidth;
      const flippedLeftEdge = triggerRect.right - triggerRect.width * 0.76 - overlayWidth;

      if (defaultRightEdge > window.innerWidth - viewportPadding && flippedLeftEdge >= viewportPadding) {
        node.dataset.hoverSide = 'left';
      }
    };

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
      triggerNodes.forEach(setHoverSide);
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
  }, [teamMembers]);

  return (
    <section className={styles.page}>
      <div className={styles.mainFrame}>
        <div className={styles.mainFrameContent}>
          {showFeaturedArtists && (
            <GnosArtistGallery
              artists={featuredArtists.map((a) => ({
                name: a.name,
                slug: a.slug,
                image: a.image,
              }))}
            />
          )}

          {/* Meet the Team — grid of images in cover frame */}
          <div ref={teamGalleryRef} className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>MEET THE TEAM</span>
              <div className={styles.sectionLineSeparator} aria-hidden>
                <img src="/svg/line-separator.svg" alt="" className={styles.lineSeparatorSvg} draggable={false} />
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
                          draggable={false}
                        />
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className={styles.coverImage}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
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
                          draggable={false}
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
