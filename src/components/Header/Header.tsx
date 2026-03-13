import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { label: 'Home', path: ROUTE_PATHS.HOME },
  { label: 'Releases', path: ROUTE_PATHS.RELEASES },
  { label: 'Reflections', path: ROUTE_PATHS.REFLECTIONS },
  { label: 'Gnos', path: ROUTE_PATHS.TEAM },
  { label: 'About', path: ROUTE_PATHS.ABOUT },
  { label: 'Contact', path: ROUTE_PATHS.CONTACT },
] as const;

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
            {revealed || trigger === 0
              ? char
              : CIPHER[Math.floor(Math.random() * CIPHER.length)]}
          </span>
        );
      })}
    </>
  );
}

const SCROLL_THRESHOLD = 90;

export const Header = () => {
  const location = useLocation();
  const hasMounted = useRef(false);
  const prevPath = useRef(location.pathname);
  const frameRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > SCROLL_THRESHOLD) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const setWidth = () => {
      document.documentElement.style.setProperty('--header-frame-width', `${el.offsetWidth}px`);
    };

    setWidth();
    const ro = new ResizeObserver(setWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const [triggers, setTriggers] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    NAV_ITEMS.forEach(({ path }) => {
      init[path] = 1;
    });
    return init;
  });

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (location.pathname !== prevPath.current) {
      const match = NAV_ITEMS.find((item) => item.path === location.pathname);
      if (match) {
        setTriggers((prev) => ({
          ...prev,
          [match.path]: (prev[match.path] || 0) + 1,
        }));
      }
      prevPath.current = location.pathname;
    }
  }, [location.pathname]);

  return (
    <header className={`${styles.header} ${hidden ? styles.headerHidden : ''}`}>
      <div ref={frameRef} className={styles.frame}>
        <nav aria-label="Main" className={styles.navWrap}>
          <ul className={styles.nav}>
            {NAV_ITEMS.map(({ label, path }, index) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  <ScrambleText
                    text={label}
                    trigger={triggers[path] || 0}
                    delay={!hasMounted.current ? index * 280 : 1200}
                  />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
