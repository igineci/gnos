import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';
import { RootLayout } from '@/app/layouts/RootLayout';
import RouteErrorPage from '@/pages/Error/RouteErrorPage';

const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const AboutPage = lazy(() => import('@/pages/About/AboutPage'));
const ContactPage = lazy(() => import('@/pages/Contact/ContactPage'));
const TeamPage = lazy(() => import('@/pages/Team/TeamPage'));
const BlogPage = lazy(() => import('@/pages/Blog/BlogPage'));
const ReleasesPage = lazy(() => import('@/pages/Releases/ReleasesPage'));
const ReleasePage = lazy(() => import('@/pages/Releases/ReleasePage'));
const ReflectionsPage = lazy(() => import('@/pages/Reflections/ReflectionsPage'));
const PersonPage = lazy(() => import('@/pages/Person/PersonPage'));
const NotFoundPage = lazy(() => import('@/pages/Error/NotFoundPage'));

const lazyPage = (Component: React.LazyExoticComponent<React.ComponentType>) => (
  <Suspense>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { path: ROUTE_PATHS.HOME, element: lazyPage(HomePage) },
      { path: ROUTE_PATHS.ABOUT, element: lazyPage(AboutPage) },
      { path: ROUTE_PATHS.CONTACT, element: lazyPage(ContactPage) },
      { path: ROUTE_PATHS.TEAM, element: lazyPage(TeamPage) },
      { path: ROUTE_PATHS.RELEASES, element: lazyPage(ReleasesPage) },
      { path: ROUTE_PATHS.RELEASE, element: lazyPage(ReleasePage) },
      { path: ROUTE_PATHS.ARTIST, element: lazyPage(PersonPage) },
      { path: ROUTE_PATHS.TEAM_MEMBER, element: lazyPage(PersonPage) },
      { path: ROUTE_PATHS.REFLECTIONS, element: lazyPage(ReflectionsPage) },
    ],
  },
  {
    path: '*',
    element: lazyPage(NotFoundPage),
  },
]);
