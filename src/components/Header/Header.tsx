import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { label: 'HOME', path: ROUTE_PATHS.HOME },
  { label: 'RELEASES', path: ROUTE_PATHS.RELEASES },
  { label: 'REFLECTIONS', path: ROUTE_PATHS.REFLECTIONS },
  { label: 'GNOS', path: ROUTE_PATHS.TEAM },
  { label: 'ABOUT', path: ROUTE_PATHS.ABOUT },
  { label: 'CONTACT', path: ROUTE_PATHS.CONTACT },
] as const;

const INDICATOR_WIDTH_PX = 102;
const INDICATOR_HEIGHT_PX = 28;
const DECODE_SPEED_MS = 45;
const DECODE_GAP_BETWEEN_ITEMS_MS = 100;

/** Left-to-right initial decode: each item starts after the previous one finishes. */
const INITIAL_DECODE_DELAYS = (() => {
  const delays: number[] = [];
  let t = 0;
  for (let i = 0; i < NAV_ITEMS.length; i++) {
    delays.push(t);
    t += NAV_ITEMS[i].label.length * DECODE_SPEED_MS + DECODE_GAP_BETWEEN_ITEMS_MS;
  }
  return delays;
})();

const CIPHER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZΔΣΨΩ░▒▓┤╡╢';

function ScrambleText({
  text,
  speed = 45,
  delay = 0,
  trigger = 0,
}: {
  text: string;
  speed?: number;
  delay?: number;
  trigger?: number;
}) {
  const [revealIndex, setRevealIndex] = useState(-1);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (trigger === 0) return;
    setRevealIndex(-1);
    const len = text.length;
    const scrambler = setInterval(() => setTick((t) => t + 1), speed);
    const delayTimer = setTimeout(() => {
      let idx = 0;
      const revealer = setInterval(() => {
        setRevealIndex(idx);
        idx++;
        if (idx >= len) {
          clearInterval(revealer);
          clearInterval(scrambler);
        }
      }, speed);
    }, delay);
    return () => {
      clearInterval(scrambler);
      clearTimeout(delayTimer);
    };
  }, [trigger, text, speed, delay]);

  return (
    <>
      {text.split('').map((char, i) => {
        const revealed = i <= revealIndex;
        return (
          <span
            key={i}
            className={`${styles.char} ${!revealed && trigger > 0 ? styles.scrambling : ''}`}
            style={{ '--i': i } as React.CSSProperties}
          >
            {revealed || trigger === 0 ? char : CIPHER[Math.floor(Math.random() * CIPHER.length)]}
          </span>
        );
      })}
    </>
  );
}

interface HeaderProps {
  loaderExited?: boolean;
}

export const Header = ({ loaderExited = false }: HeaderProps) => {
  const location = useLocation();
  const frameRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const lastScrollY = useRef(0);
  const lastDirectionRef = useRef<'up' | 'down' | null>(null);
  const tickingRef = useRef(false);
  const initialDecodeRef = useRef(true);
  const hasMountedRef = useRef(false);
  const prevPathRef = useRef(location.pathname);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const [triggers, setTriggers] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    NAV_ITEMS.forEach(({ path }) => {
      init[path] = 0;
    });
    return init;
  });

  const isGnosSection =
    location.pathname === ROUTE_PATHS.TEAM ||
    location.pathname.startsWith('/artist') ||
    location.pathname.startsWith('/team');
  const activeIndex = NAV_ITEMS.findIndex((item) =>
    item.path === location.pathname || (item.path === ROUTE_PATHS.TEAM && isGnosSection)
  );
  const targetIndex = hoveredIndex ?? (activeIndex >= 0 ? activeIndex : 0);

  /* Header scroll: hide on scroll down past threshold, show on scroll up or near top. RAF-throttled for smooth behavior. */
  const SCROLL_THRESHOLD_PX = 80;
  const SCROLL_TOP_SHOW_PX = 24;
  const SCROLL_DELTA_MIN_PX = 5;

  useEffect(() => {
    const updateHeader = () => {
      const y = window.scrollY;
      const prevY = lastScrollY.current;
      const delta = y - prevY;
      lastScrollY.current = y;
      tickingRef.current = false;

      if (y <= SCROLL_TOP_SHOW_PX) {
        setHidden(false);
        lastDirectionRef.current = null;
        return;
      }
      if (Math.abs(delta) < SCROLL_DELTA_MIN_PX) return;

      const direction = delta > 0 ? 'down' : 'up';
      lastDirectionRef.current = direction;
      if (direction === 'down' && y > SCROLL_THRESHOLD_PX) setHidden(true);
      else if (direction === 'up') setHidden(false);
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(updateHeader);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!loaderExited) return;
    const run = () => {
      const frame = frameRef.current;
      const links = linkRefs.current;
      if (!frame) return;
      const frameRect = frame.getBoundingClientRect();
      const frameWidth = frameRect.width;
      if (!links.length) return;
      const link = links[targetIndex];
      if (!link) return;
      const linkRect = link.getBoundingClientRect();
      const centerX = linkRect.left - frameRect.left + linkRect.width / 2;
      let left = Math.round(centerX - INDICATOR_WIDTH_PX / 2);
      left = Math.max(0, Math.min(left, frameWidth - INDICATOR_WIDTH_PX));
      setIndicatorLeft(left);
      setIndicatorVisible(true);
    };
    run();
    const ro = new ResizeObserver(run);
    if (frameRef.current) ro.observe(frameRef.current);
    window.addEventListener('resize', run);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', run);
    };
  }, [loaderExited, targetIndex]);

  /* Initial decode: when loader exits, trigger all nav items with staggered delay */
  useEffect(() => {
    if (!loaderExited) return;
    setTriggers((prev) => {
      const next = { ...prev };
      NAV_ITEMS.forEach((_, index) => {
        const path = NAV_ITEMS[index].path;
        next[path] = 1;
      });
      return next;
    });
  }, [loaderExited]);

  /* Close mobile menu on Escape; lock body scroll when menu open */
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  /* On route change: re-trigger decode for the newly active item; close mobile menu */
  useEffect(() => {
    setMenuOpen(false);
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (!loaderExited) return;
    if (location.pathname !== prevPathRef.current) {
      initialDecodeRef.current = false;
      const match = NAV_ITEMS.find((item) => item.path === location.pathname);
      if (match) {
        setTriggers((prev) => ({ ...prev, [match.path]: (prev[match.path] || 0) + 1 }));
      }
      prevPathRef.current = location.pathname;
    }
  }, [loaderExited, location.pathname]);

  return (
    <header
      className={`${styles.header} ${!loaderExited ? styles.headerWaiting : ''} ${menuOpen ? styles.headerMenuOpen : ''}`}
    >
      {menuOpen && (
        <div
          className={styles.menuBackdrop}
          aria-hidden
          onClick={() => setMenuOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setMenuOpen(false)}
        />
      )}
      <div
        className={`${styles.headerInner} ${hidden ? styles.headerHidden : ''}`}
        aria-hidden={hidden}
      >
        <div ref={frameRef} className={styles.frame}>
        <div className={styles.topRow}>
          <Link to={ROUTE_PATHS.HOME} className={styles.logoBlock} aria-label="GNOS Records Home">
            <img src="/logo.svg" alt="" className={styles.logoIcon} width={28} height={28} />
            <span className={styles.logoText}>GNOS RECORDS</span>
          </Link>

          <button
            type="button"
            className={styles.menuButton}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={styles.menuButtonIcon} aria-hidden />
          </button>

          <nav id="main-nav" aria-label="Main" className={styles.navWrap}>
            <ul ref={navRef} className={styles.nav}>
              {NAV_ITEMS.map(({ label, path }, index) => (
                <li key={path}>
                  <NavLink
                    ref={(el) => {
                      linkRefs.current[index] = el;
                    }}
                    to={path}
                    className={({ isActive }) => {
                      const gnosActive = path === ROUTE_PATHS.TEAM && isGnosSection;
                      const active = isActive || gnosActive;
                      const showUnderline =
                        hoveredIndex !== null ? index === hoveredIndex : active;
                      return `${styles.navLink} ${active ? styles.navLinkActive : ''} ${showUnderline ? styles.navLinkUnderline : ''}`;
                    }}
                    {...(path === ROUTE_PATHS.TEAM
                      ? { isActive: () => isGnosSection }
                      : {})}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setMenuOpen(false)}
                  >
                    <ScrambleText
                      text={label}
                      trigger={triggers[path] ?? 0}
                      delay={initialDecodeRef.current ? INITIAL_DECODE_DELAYS[index] : 400}
                      speed={DECODE_SPEED_MS}
                    />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.decorativeRight} aria-hidden>
            <img src="/svg/header.svg" alt="" className={styles.decorativeSvg} />
          </div>
        </div>

        <div
          className={styles.lineRow}
          style={
            {
              '--indicator-left': `${indicatorLeft}px`,
              '--indicator-width': `${INDICATOR_WIDTH_PX}px`,
            } as React.CSSProperties
          }
        >
          <div className={styles.lineSegment} data-side="left" />
          <div
            className={`${styles.indicator} ${indicatorVisible ? styles.indicatorVisible : ''}`}
            aria-hidden
          >
            <svg
              className={styles.indicatorSvg}
              width={INDICATOR_WIDTH_PX}
              height={INDICATOR_HEIGHT_PX}
              viewBox="0 0 102 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.15207 26.8206L19.3321 2.41261L84.3481 2.55661L100.8 26.9286L101.016 27.2526L101.304 27.0366L101.7 26.7846L101.988 26.5686L101.808 26.2806L85.14 1.6206L85.0681 1.5126L84.96 1.36862H84.78H84.6721L19.044 1.22461H18.936H18.756L18.6481 1.36862L18.576 1.47661L0.216035 26.1366L0 26.4246L0.288105 26.6406L0.648105 26.8926L0.936035 27.1086L1.15207 26.8206Z" fill="currentColor" />
              <path d="M27.7198 0H35.2798L37.7279 1.62H25.3438L27.7198 0Z" fill="currentColor" />
              <path d="M70.5967 3.74402H78.1928L80.6047 2.12402H68.2207L70.5967 3.74402Z" fill="currentColor" />
              <path d="M5.18391 17.3882L0.648047 23.4362L0.503906 26.3521L7.88391 16.4521L5.18391 17.3882Z" fill="currentColor" />
            </svg>
          </div>
          <div className={styles.lineSegment} data-side="right" />
        </div>
        </div>
      </div>
    </header>
  );
};
