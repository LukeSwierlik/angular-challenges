import { hasRoleGuard, isAdminGuard } from './has-permission.guard';

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'no-user',
    loadComponent: () =>
      import('./dashboard/no-user.component').then((m) => m.NoUserComponent),
  },
  {
    path: 'enter',
    canMatch: [() => isAdminGuard()],
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [() => hasRoleGuard(['MANAGER'])],
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [() => hasRoleGuard(['WRITER', 'READER'])],
    loadComponent: () =>
      import('./dashboard/writer-reader.component').then(
        (m) => m.WriterReaderComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [() => hasRoleGuard(['CLIENT'])],
    loadComponent: () =>
      import('./dashboard/client.component').then((m) => m.ClientComponent),
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/everyone.component').then((m) => m.EveryoneComponent),
  },
];
