import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { label: 'About', path: ROUTE_PATHS.ABOUT },
  { label: 'Releases', path: ROUTE_PATHS.RELEASES },
  { label: 'Blog', path: ROUTE_PATHS.BLOG },
  { label: 'Team', path: ROUTE_PATHS.TEAM },
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

export const Header = () => {
  const location = useLocation();
  const hasMounted = useRef(false);
  const prevPath = useRef(location.pathname);

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
    <header className={styles.header}>
      <nav aria-label="Main">
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
                  delay={!hasMounted.current ? 600 : 1200}
                />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
