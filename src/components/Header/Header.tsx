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
const DECODE_SPEED_MS = 45;
const DECODE_GAP_BETWEEN_ITEMS_MS = 100;

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
  const initialDecodeRef = useRef(true);
  const hasMountedRef = useRef(false);
  const prevPathRef = useRef(location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
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
  const isReleasesSection =
    location.pathname === ROUTE_PATHS.RELEASES ||
    location.pathname.startsWith(`${ROUTE_PATHS.RELEASES}/`);
  const activeIndex = NAV_ITEMS.findIndex((item) =>
    item.path === location.pathname ||
    (item.path === ROUTE_PATHS.TEAM && isGnosSection) ||
    (item.path === ROUTE_PATHS.RELEASES && isReleasesSection)
  );
  const targetIndex = activeIndex >= 0 ? activeIndex : 0;

  useEffect(() => {
    if (!loaderExited) return;
    const run = () => {
      const frame = frameRef.current;
      const links = linkRefs.current;
      if (!frame) return;
      const frameRect = frame.getBoundingClientRect();
      if (!links.length) return;
      const link = links[targetIndex];
      if (!link) return;
      const linkRect = link.getBoundingClientRect();
      const linkCenterX = linkRect.left + linkRect.width / 2;
      let left = Math.round(linkCenterX - frameRect.left - INDICATOR_WIDTH_PX / 2);
      left = Math.max(0, Math.min(left, frameRect.width - INDICATOR_WIDTH_PX));
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

  useEffect(() => {
    setMenuOpen(false);
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (!loaderExited) return;
    if (location.pathname !== prevPathRef.current) {
      initialDecodeRef.current = false;
      if (activeIndex >= 0) {
        const path = NAV_ITEMS[activeIndex].path;
        setTriggers((prev) => ({ ...prev, [path]: (prev[path] || 0) + 1 }));
      }
      prevPathRef.current = location.pathname;
    }
  }, [loaderExited, location.pathname, activeIndex]);

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
      <div className={styles.headerInner}>
        <div ref={frameRef} className={styles.frame}>
          <div className={styles.topRow}>
            <Link to={ROUTE_PATHS.HOME} className={styles.logoBlock} aria-label="GNOS Records Home">
              <img src="/svg/logo-2.svg" alt="" className={styles.logoIcon} width={38} height={38} />
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
                        const releasesActive = path === ROUTE_PATHS.RELEASES && isReleasesSection;
                        const active = isActive || gnosActive || releasesActive;
                        return `${styles.navLink} ${active ? styles.navLinkActive : ''}`;
                      }}
                      {...(path === ROUTE_PATHS.TEAM
                        ? { isActive: () => isGnosSection }
                        : path === ROUTE_PATHS.RELEASES
                          ? { isActive: () => isReleasesSection }
                          : {})}
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
          </div>

          <div className={styles.decorativeRight} aria-hidden>
            <div className={styles.decorativeSvg} />
          </div>

          <div className={styles.headerBottom}>
            <div className={styles.headerLine} aria-hidden />
            {indicatorVisible && (
              <div
                className={styles.indicator}
                style={{ left: `${indicatorLeft}px` }}
                aria-hidden
              >
                <img src="/svg/header-nav-indicator.svg" alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
