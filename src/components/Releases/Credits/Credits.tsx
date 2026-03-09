import type { Release } from 'content-collections';
import styles from './Credits.module.css';

interface CreditsProps {
  release: Release;
}

export const Credits = ({ release }: CreditsProps) => {
  const { credits } = release;

  if (!credits?.length) return null;

  return (
    <div className={styles.wrap}>
      <h3 className={styles.heading}>Credits</h3>
      <dl className={styles.list}>
        {credits.map(({ role, name }, i) => (
          <div key={i} className={styles.item}>
            <dt className={styles.role}>{role}</dt>
            <dd className={styles.name}>{name}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
