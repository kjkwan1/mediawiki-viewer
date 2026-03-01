import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'stream-view',
    loadComponent: () => import('./stream-view').then((m) => m.StreamView),
  },
];
