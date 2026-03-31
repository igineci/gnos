import { createPortal } from 'react-dom';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '@/pages/Team/TeamPage.module.css';

export type GnosArtistGalleryItem = {
  name: string;
  slug: string;
  image?: string;
};

type GnosArtistGalleryProps = {
  artists: GnosArtistGalleryItem[];
  emptyMessage?: string;
  /** Merged onto the root (e.g. tighter margins on release page). */
  rootClassName?: string;
  /** Merged onto the gallery grid (e.g. single-row layout on release page). */
  galleryClassName?: string;
};

const MOBILE_MAX_PX = 767;

type FixedHoverState = {
  name: string;
  left: number;
  top: number;
  flip: boolean;
};

function isMobileViewport() {
  return typeof window !== 'undefined' && window.innerWidth <= MOBILE_MAX_PX;
}

function computeHoverOverlayLayout(link: HTMLElement): Pick<FixedHoverState, 'left' | 'top' | 'flip'> {
  const rect = link.getBoundingClientRect();
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const overlayW = Math.min(Math.max(15.5 * rem, window.innerWidth * 0.24), 18.5 * rem);
  const viewportPadding = 16;
  const defaultRightEdge = rect.left + rect.width * 0.76 + overlayW;
  const flippedLeftEdge = rect.right - rect.width * 0.76 - overlayW;
  const flip =
    defaultRightEdge > window.innerWidth - viewportPadding && flippedLeftEdge >= viewportPadding;

  const top = rect.top + rect.height * 1.26;
  const left = flip ? rect.left + rect.width * 0.24 - overlayW : rect.left + rect.width * 0.76;

  return { left, top, flip };
}

function fitHoverName(node: HTMLElement) {
  if (isMobileViewport()) {
    node.style.fontSize = '';
    return;
  }

  const parent = node.parentElement;

  if (!parent) {
    return;
  }

  const parentStyles = window.getComputedStyle(parent);
  const horizontalPadding =
    Number.parseFloat(parentStyles.paddingLeft) + Number.parseFloat(parentStyles.paddingRight);
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
}

export function GnosArtistGallery({
  artists,
  emptyMessage = 'No featured artists yet.',
  rootClassName,
  galleryClassName,
}: GnosArtistGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const hoveredLinkRef = useRef<HTMLAnchorElement | null>(null);
  const portalOverlayRef = useRef<HTMLDivElement | null>(null);
  const [fixedHover, setFixedHover] = useState<FixedHoverState | null>(null);
  const layoutKey = artists.map((a) => `${a.slug}:${a.image ?? ''}`).join('|');

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return undefined;
    }

    const nameNodes = Array.from(root.querySelectorAll<HTMLElement>('[data-hover-name]'));
    const triggerNodes = Array.from(root.querySelectorAll<HTMLElement>('[data-hover-trigger]'));
    let frameId = 0;

    const setHoverSide = (node: HTMLElement) => {
      if (!isMobileViewport()) {
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

    const fitHoverNames = () => {
      if (!isMobileViewport()) {
        return;
      }
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
  }, [layoutKey]);

  useEffect(() => {
    if (!fixedHover) {
      return undefined;
    }

    const sync = () => {
      const link = hoveredLinkRef.current;
      if (!link) {
        return;
      }
      const { left, top, flip } = computeHoverOverlayLayout(link);
      setFixedHover((prev) => (prev ? { ...prev, left, top, flip } : null));
    };

    window.addEventListener('scroll', sync, true);
    window.addEventListener('resize', sync);
    return () => {
      window.removeEventListener('scroll', sync, true);
      window.removeEventListener('resize', sync);
    };
  }, [fixedHover]);

  useEffect(() => {
    const onResize = () => {
      if (isMobileViewport()) {
        hoveredLinkRef.current = null;
        setFixedHover(null);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useLayoutEffect(() => {
    if (!fixedHover || !portalOverlayRef.current) {
      return;
    }
    const nameNode = portalOverlayRef.current.querySelector<HTMLElement>('[data-hover-name]');
    if (nameNode) {
      fitHoverName(nameNode);
    }
  }, [fixedHover]);

  const showDesktopPortal = (e: React.PointerEvent<HTMLAnchorElement>, artist: GnosArtistGalleryItem) => {
    if (isMobileViewport()) {
      return;
    }
    const link = e.currentTarget;
    hoveredLinkRef.current = link;
    const { left, top, flip } = computeHoverOverlayLayout(link);
    setFixedHover({ name: artist.name, left, top, flip });
  };

  const hideDesktopPortal = () => {
    if (isMobileViewport()) {
      return;
    }
    hoveredLinkRef.current = null;
    setFixedHover(null);
  };

  const onDesktopFocus = (e: React.FocusEvent<HTMLAnchorElement>, artist: GnosArtistGalleryItem) => {
    if (isMobileViewport()) {
      return;
    }
    const link = e.currentTarget;
    hoveredLinkRef.current = link;
    const { left, top, flip } = computeHoverOverlayLayout(link);
    setFixedHover({ name: artist.name, left, top, flip });
  };

  const portalNode =
    fixedHover && typeof document !== 'undefined'
      ? createPortal(
          <div
            ref={portalOverlayRef}
            className={`${styles.hoverOverlay} ${styles.hoverOverlayFixedPortal} ${fixedHover.flip ? styles.hoverOverlayFlipped : ''}`}
            style={{ left: fixedHover.left, top: fixedHover.top }}
            aria-hidden
          >
            <img
              src="/svg/coming-soon-hover.svg"
              alt=""
              className={styles.hoverSvg}
              draggable={false}
            />
            <div className={`${styles.hoverText} ${styles.hoverTextArtist}`}>
              <span className={styles.hoverName} data-hover-name>
                {fixedHover.name}
              </span>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {portalNode}
      <div
        ref={rootRef}
        className={[styles.section, rootClassName].filter(Boolean).join(' ')}
      >
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>FEATURED ARTISTS</span>
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
          <div
            className={[styles.galleryGrid, galleryClassName].filter(Boolean).join(' ')}
          >
            {artists.length > 0 ? (
              artists.map((artist) => (
                <Link
                  key={artist.slug}
                  to={`/artist/${artist.slug}`}
                  className={styles.galleryItem}
                  title={artist.name}
                  data-hover-trigger
                  onPointerEnter={(e) => showDesktopPortal(e, artist)}
                  onPointerLeave={hideDesktopPortal}
                  onPointerCancel={hideDesktopPortal}
                  onFocus={(e) => onDesktopFocus(e, artist)}
                  onBlur={hideDesktopPortal}
                >
                  <div className={styles.galleryArtwork}>
                    <img
                      src="/svg/releases/cover-frame.svg"
                      alt=""
                      className={styles.coverFrame}
                      aria-hidden
                      draggable={false}
                    />
                    {artist.image ? (
                      <>
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className={styles.coverImageColor}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                        />
                        <img
                          src={artist.image}
                          alt=""
                          className={styles.coverImageBw}
                          aria-hidden
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                        />
                      </>
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
                      <span className={styles.hoverName} data-hover-name>
                        {artist.name}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className={styles.emptyState}>{emptyMessage}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
