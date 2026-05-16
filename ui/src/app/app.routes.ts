import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home')
        .then(m => m.Home)
  },
  {
    path: 'post/:slug',
    loadComponent: () =>
      import('./pages/post-view/post-view')
        .then(m => m.PostView)
  },
  {
    path: 'post/:slug/edit',
    loadComponent: () =>
      import('./pages/post-edit/post-edit')
        .then(m => m.PostEdit)
  }
];
