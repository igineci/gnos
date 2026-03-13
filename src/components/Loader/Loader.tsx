import { useEffect, useRef, useState } from 'react';
import styles from './Loader.module.css';

const DURATION_MS = 3000;
const FADE_OUT_MS = 500;

export const Loader = () => {
  const [exited, setExited] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(100, (elapsed / DURATION_MS) * 100);

      if (barRef.current) barRef.current.style.width = `${p}%`;
      if (percentRef.current) percentRef.current.textContent = `${Math.round(p)}%`;

      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        if (overlayRef.current) {
          overlayRef.current.style.opacity = '0';
          overlayRef.current.style.transition = `opacity ${FADE_OUT_MS}ms ease-out`;
          overlayRef.current.style.pointerEvents = 'none';
        }
        setTimeout(() => setExited(true), FADE_OUT_MS);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  if (exited) return null;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      aria-live="polite"
      aria-label="Loading"
    >
      <div className={styles.container}>
        <div className={styles.barOutline}>
          <div ref={barRef} className={styles.barFill} style={{ width: '0%' }} />
        </div>
        <span ref={percentRef} className={styles.percent}>{0}%</span>
      </div>
    </div>
  );
};
