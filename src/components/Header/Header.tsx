import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { label: 'About', path: ROUTE_PATHS.ABOUT },
  { label: 'Releases', path: ROUTE_PATHS.RELEASES },
  { label: 'Blog', path: ROUTE_PATHS.BLOG },
  { label: 'Team', path: ROUTE_PATHS.TEAM },
  { label: 'Contact', path: ROUTE_PATHS.CONTACT },
] as const;

export const Header = () => (
  <header className={styles.header}>
    <NavLink to={ROUTE_PATHS.HOME} className={styles.logo}>
      GNOS
    </NavLink>

    <nav>
      <ul className={styles.nav}>
        {NAV_ITEMS.map(({ label, path }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);
