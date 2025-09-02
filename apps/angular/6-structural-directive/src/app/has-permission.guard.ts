import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { iif, map, mergeMap, of } from 'rxjs';
import { Role } from './user.model';
import { UserStore } from './user.store';

export const isAdminGuard = () => {
  const userStore = inject(UserStore);
  const router = inject(Router);

  return userStore.isUserLoggedIn$.pipe(
    mergeMap((hasUser) =>
      iif(
        () => hasUser,
        userStore.isAdmin$.pipe(map(Boolean)),
        of(router.parseUrl('no-user')),
      ),
    ),
  );
};

export const hasRoleGuard = (accessRolesList: Role[]) => {
  const userStore = inject(UserStore);
  const router = inject(Router);

  return userStore.isUserLoggedIn$.pipe(
    mergeMap((hasUser) =>
      iif(
        () => hasUser,
        userStore.hasAnyRole(accessRolesList).pipe(map(Boolean)),
        of(router.parseUrl('no-user')),
      ),
    ),
  );
};
