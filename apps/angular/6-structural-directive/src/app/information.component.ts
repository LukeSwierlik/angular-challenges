import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HasRoleDirective } from './directives/has-role.directive';
import { UserStore } from './user.store';

@Component({
  selector: 'app-information',
  imports: [HasRoleDirective],
  template: `
    <section class="mt-10 w-full rounded-md bg-gray-50 p-2">
      <h2 class="mb-4 text-xl">Information Panel</h2>

      <!-- admin can see everything -->
      <div *appHasRoleIsAdmin="true">visible only for super admin</div>
      <div *appHasRole="'MANAGER'">visible if manager</div>
      <div *appHasRole="['MANAGER', 'READER']">
        visible if manager and/or reader
      </div>
      <div *appHasRole="['MANAGER', 'WRITER']">
        visible if manager and/or writer
      </div>
      <div *appHasRole="'CLIENT'">visible if client</div>
      <div>visible for everyone</div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  private readonly userStore = inject(UserStore);

  user$ = this.userStore.user$;
}
