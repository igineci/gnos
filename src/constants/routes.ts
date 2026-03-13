export const ROUTE_PATHS = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  TEAM: '/gnos-team',
  RELEASES: '/releases',
  REFLECTIONS: '/reflections',
  /** Pattern for single release: /releases/:slug */
  RELEASE: '/releases/:slug',
} as const;

/** Page order for pagination (linear flow). */
export const PAGE_ORDER: readonly string[] = [
  ROUTE_PATHS.HOME,
  ROUTE_PATHS.ABOUT,
  ROUTE_PATHS.RELEASES,
  ROUTE_PATHS.REFLECTIONS,
  ROUTE_PATHS.TEAM,
  ROUTE_PATHS.CONTACT,
] as const;
