import styles from './ReflectionsPage.module.css';

export default function ReflectionsPage() {
  return (
    <section className={styles.page} aria-label="Reflections – coming soon">
      <div className={styles.centerWrap}>
        <div className={styles.taglineFrame}>
          <img
            src="/svg/coming-soon-frame.svg"
            alt=""
            className={styles.textFrameSvg}
            aria-hidden
          />
          <span className={styles.tagline}>
            Coming soon
          </span>
        </div>
      </div>
    </section>
  );
}
