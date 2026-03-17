import { useEffect, useId, useRef, useState } from 'react';
import styles from './Loader.module.css';

const DURATION_MS = 3000;
const FADE_OUT_MS = 500;
const BAR_VIEWBOX_WIDTH = 375;
const BAR_VIEWBOX_HEIGHT = 27;
const BAR_PATH =
  'M360.437 24.1H14.3273C10.0973 19.87 7.72734 17.5 3.52734 13.3C7.72734 9.07 10.0973 6.7 14.3273 2.5H360.437C364.667 6.7 367.007 9.07 371.237 13.3C367.007 17.5 364.667 19.87 360.437 24.1Z';

interface LoaderProps {
  onExited?: () => void;
}

export const Loader = ({ onExited }: LoaderProps) => {
  const [exited, setExited] = useState(false);
  const clipRef = useRef<SVGRectElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const svgId = useId().replace(/:/g, '');
  const clipPathId = `${svgId}-clip`;
  const fillGradientId = `${svgId}-gradient`;

  useEffect(() => {
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(100, (elapsed / DURATION_MS) * 100);

      if (clipRef.current) clipRef.current.setAttribute('width', `${(p / 100) * BAR_VIEWBOX_WIDTH}`);
      if (percentRef.current) percentRef.current.textContent = `${Math.round(p)}%`;

      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        if (overlayRef.current) {
          overlayRef.current.style.opacity = '0';
          overlayRef.current.style.transition = `opacity ${FADE_OUT_MS}ms ease-out`;
          overlayRef.current.style.pointerEvents = 'none';
        }
        setTimeout(() => {
          setExited(true);
          onExited?.();
        }, FADE_OUT_MS);
      }
    };

    requestAnimationFrame(tick);
  }, [onExited]);

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
          <svg
            className={styles.barSvg}
            viewBox={`0 0 ${BAR_VIEWBOX_WIDTH} ${BAR_VIEWBOX_HEIGHT}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={fillGradientId} x1="0" y1="0" x2={BAR_VIEWBOX_WIDTH} y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(8, 89, 94, 0.78)" />
                <stop offset="55%" stopColor="rgba(24, 227, 209, 0.92)" />
                <stop offset="100%" stopColor="rgba(8, 89, 94, 0.82)" />
              </linearGradient>
              <clipPath id={clipPathId} clipPathUnits="userSpaceOnUse">
                <rect ref={clipRef} x="0" y="0" width="0" height={BAR_VIEWBOX_HEIGHT} />
              </clipPath>
            </defs>

            <path className={styles.barShell} d={BAR_PATH} />
            <path className={styles.barFill} d={BAR_PATH} clipPath={`url(#${clipPathId})`} fill={`url(#${fillGradientId})`} />
            <path className={styles.barFrame} d={BAR_PATH} />
          </svg>
        </div>
        <span ref={percentRef} className={styles.percent}>{0}%</span>
      </div>
    </div>
  );
};
