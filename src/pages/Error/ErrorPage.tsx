import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';
import styles from './ErrorPage.module.css';

interface ErrorPageProps {
  status: string;
  title: string;
  description: string;
}

export const ErrorPage = ({ status, title, description }: ErrorPageProps) => (
  <section className={styles.page}>
    <div className={styles.shell}>
      <div className={styles.panel}>
        <div className={styles.panelInner}>
          <div className={styles.statusRow}>
            <span className={styles.eyebrow}>GNOS SYSTEM</span>
            <span className={styles.status}>{status}</span>
          </div>
          <div className={styles.line} aria-hidden />
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          <div className={styles.actions}>
            <Link to={ROUTE_PATHS.HOME} className={styles.homeLink}>
              Return To Base
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);
