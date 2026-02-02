export enum AppRoutePathnames {
  DEFAULT = '/',
  HOME = '/home',
  HEROES = '/heroes',
  ABOUT = '/about',
  ANY = '*',
}

export const AppRouteNames: Partial<Record<AppRoutePathnames, string>> = {
  [AppRoutePathnames.HOME]: 'Home',
  [AppRoutePathnames.HEROES]: 'Heroes',
  [AppRoutePathnames.ABOUT]: 'About',
};
