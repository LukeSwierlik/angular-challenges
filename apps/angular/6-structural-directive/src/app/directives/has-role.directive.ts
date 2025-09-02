import {
  DestroyRef,
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

@Directive({
  selector: '[appHasRole], [appHasRoleIsAdmin]',
  standalone: true,
})
export class HasRoleDirective {
  private store = inject(UserStore);
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private destroyRef = inject(DestroyRef);

  @Input('appHasRole')
  set role(role: Role | Role[] | undefined) {
    if (role) {
      this.checkRole(role);
    } else {
      this.updateView(false);
    }
  }

  @Input('appHasRoleIsAdmin')
  set isAdmin(isAdmin: boolean) {
    if (isAdmin) {
      this.checkAdmin();
    } else {
      this.updateView(false);
    }
  }

  private checkRole(role: Role | Role[]) {
    this.store
      .hasAnyRole(role)
      .pipe(map(Boolean), takeUntilDestroyed(this.destroyRef))
      .subscribe((shouldShow) => {
        this.updateView(shouldShow);
      });
  }

  private checkAdmin() {
    this.store.isAdmin$
      .pipe(map(Boolean), takeUntilDestroyed(this.destroyRef))
      .subscribe((shouldShow) => {
        this.updateView(shouldShow);
      });
  }

  private updateView(shouldShow: boolean) {
    if (shouldShow) {
      if (this.viewContainer.length === 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      this.viewContainer.clear();
    }
  }
}
