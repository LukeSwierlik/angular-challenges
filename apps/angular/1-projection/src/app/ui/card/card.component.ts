import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content />

      <section>
        <ng-container
          *ngTemplateOutlet="
            renderList;
            context: {
              list: list(),
              nameProps: nameProps(),
              handleDeleteItem: onDelete
            }
          "></ng-container>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem.emit()">
        Add
      </button>
    </div>

    <ng-template
      #renderList
      let-cxtList="list"
      let-cxtNameProps="nameProps"
      let-cxtHandleDeleteItem="handleDeleteItem">
      @for (item of cxtList; track item.id) {
        <app-list-item
          [name]="item[cxtNameProps]"
          [id]="item.id"
          (delete)="cxtHandleDeleteItem($event)"></app-list-item>
      }
    </ng-template>
  `,
  imports: [ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly nameProps = input.required<string>();
  readonly customClass = input('');

  readonly addNewItem = output<void>();
  readonly removeItem = output<number>();

  onDelete = (id: number): void => {
    this.removeItem.emit(id);
  };
}
