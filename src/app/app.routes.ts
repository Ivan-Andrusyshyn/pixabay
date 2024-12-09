import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'search-images',
    loadComponent: () =>
      import('./pages/search/search.component').then((c) => c.SearchComponent),
  },
  {
    path: 'my-images',
    loadComponent: () =>
      import('./pages/my/my.component').then((c) => c.MyComponent),
  },
  {
    path: 'liked-images',
    loadComponent: () =>
      import('./pages/liked/liked.component').then((c) => c.LikedComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
