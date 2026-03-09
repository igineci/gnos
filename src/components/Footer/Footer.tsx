import styles from './Footer.module.css';

export const Footer = () => (
  <footer className={styles.footer}>
    <img
      src="/logo.png"
      alt=""
      className={styles.seal}
      aria-hidden
    />
    <p className={styles.identity}>GNOS Records</p>
    <div className={styles.dataRow}>
      <span className={styles.datum}>Est. 2025</span>
      <span className={styles.datum}>Underground</span>
      <span className={styles.datum}>
        <a href="mailto:contact@gnos.records">contact@gnos.records</a>
      </span>
    </div>
  </footer>
);
