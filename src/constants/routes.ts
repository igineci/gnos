export const ROUTE_PATHS = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  TEAM: '/meet-our-team',
  BLOG: '/blog',
  RELEASES: '/releases',
} as const;

/** Page order for pagination (linear flow). */
export const PAGE_ORDER: readonly string[] = [
  ROUTE_PATHS.HOME,
  ROUTE_PATHS.ABOUT,
  ROUTE_PATHS.RELEASES,
  ROUTE_PATHS.BLOG,
  ROUTE_PATHS.TEAM,
  ROUTE_PATHS.CONTACT,
] as const;
