import { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import FaultyTerminal from '@/components/FaultyTerminal/FaultyTerminal';
import { Loader } from '@/components/Loader/Loader';
import { ROUTE_PATHS } from '@/constants/routes';
import styles from './RootLayout.module.css';

export const RootLayout = () => {
  const { pathname } = useLocation();
  const isAboutPage = pathname === ROUTE_PATHS.ABOUT;
  const [loaderExited, setLoaderExited] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    if (isAboutPage) root.classList.add('about-page-active');
    else root.classList.remove('about-page-active');
    return () => root.classList.remove('about-page-active');
  }, [isAboutPage]);

  return (
    <div
      className="root-layout"
      style={{ minHeight: '100vh', backgroundColor: 'var(--gnos-black)', display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      <Loader onExited={() => setLoaderExited(true)} />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {/* <Suspense fallback={null}>
          <FaultyTerminal
            tint="#08595E"
            scale={2}
            mouseReact
            mouseStrength={0.2}
            pageLoadAnimation
            brightness={0.4}
            scanlineIntensity={1.1}
            curvature={0}
            glitchAmount={0}
            flickerAmount={0}
          />
        </Suspense> */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            pointerEvents: 'none',
          }}
          aria-hidden
        />
      </div>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1, paddingTop: 'calc(var(--gnos-header-height) + var(--gnos-home-vertical-gap, 2.25rem))' }}>
        <Header loaderExited={loaderExited} />
        <main style={{ flex: 1, width: '100%', boxSizing: 'border-box' }}>
          <div className={styles.pageContent}>
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
