import { Routes } from '@angular/router';
import { routes as streamViewRoutes } from './features/stream-view/routes';
import { routes as dashboardRoutes } from './features/dashboard/routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  ...streamViewRoutes,
  ...dashboardRoutes,
];
