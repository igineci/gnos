import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

export const RootLayout = () => (
  <div style={{ minHeight: '100vh', backgroundColor: 'var(--gnos-black)', display: 'flex', flexDirection: 'column' }}>
    <Header />
    <main style={{ flex: 1 }}>
      <Outlet />
    </main>
    <Footer />
  </div>
);
