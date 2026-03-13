import type { ReactNode } from 'react';
import styles from './GnosFrame.module.css';

type GnosFrameProps = {
  children: ReactNode;
  className?: string;
  /** Size variant: images (large), default (bio/promo), home (interview – home frame.svg). */
  variant?: 'images' | 'default' | 'home';
};

/**
 * One frame per section: frame-gnos.svg used as border (default). Home variant uses home/frame.svg.
 */
export function GnosFrame({ children, className = '', variant = 'default' }: GnosFrameProps) {
  const variantClass =
    variant === 'images' ? styles.gnosFrameImages : variant === 'home' ? styles.gnosFrameHome : '';
  return (
    <div
      className={`${styles.gnosFrame} ${variantClass} ${className}`.trim()}
    >
      <div className={styles.frameContent}>{children}</div>
    </div>
  );
}
