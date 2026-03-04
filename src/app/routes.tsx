import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';
import { RootLayout } from '@/app/layouts/RootLayout';

const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const AboutPage = lazy(() => import('@/pages/About/AboutPage'));
const ContactPage = lazy(() => import('@/pages/Contact/ContactPage'));
const TeamPage = lazy(() => import('@/pages/Team/TeamPage'));
const BlogPage = lazy(() => import('@/pages/Blog/BlogPage'));
const ReleasesPage = lazy(() => import('@/pages/Releases/ReleasesPage'));

const lazyPage = (Component: React.LazyExoticComponent<React.ComponentType>) => (
  <Suspense>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: ROUTE_PATHS.HOME, element: lazyPage(HomePage) },
      { path: ROUTE_PATHS.ABOUT, element: lazyPage(AboutPage) },
      { path: ROUTE_PATHS.CONTACT, element: lazyPage(ContactPage) },
      { path: ROUTE_PATHS.TEAM, element: lazyPage(TeamPage) },
      { path: ROUTE_PATHS.BLOG, element: lazyPage(BlogPage) },
      { path: ROUTE_PATHS.RELEASES, element: lazyPage(ReleasesPage) },
    ],
  },
]);
