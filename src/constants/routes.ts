export const ROUTE_PATHS = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  TEAM: '/gnos-team',
  RELEASES: '/releases',
  REFLECTIONS: '/reflections',
  /** Pattern for single release: /releases/:slug */
  RELEASE: '/releases/:slug',
  /** Pattern for artist person page: /artist/:slug */
  ARTIST: '/artist/:slug',
  /** Pattern for team member person page: /team/:slug */
  TEAM_MEMBER: '/team/:slug',
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
