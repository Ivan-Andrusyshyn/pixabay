interface RouteList {
  name: string;
  route: string;
  isPrivate: boolean;
}

const routeList: RouteList[] = [
  { name: 'home', route: 'home', isPrivate: false },
  { name: 'search', route: 'search-media', isPrivate: false },
  { name: 'gallery', route: 'gallery', isPrivate: true },
  { name: 'profile', route: 'profile', isPrivate: true },
];
export { routeList, RouteList };
