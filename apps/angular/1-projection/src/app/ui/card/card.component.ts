import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CardType } from '../../model/card.model';
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
      let-list="list"
      let-nameProps="nameProps"
      let-handleDeleteItem="handleDeleteItem">
      @for (item of list; track item.id) {
        <app-list-item
          [name]="item[nameProps]"
          [id]="item.id"
          [type]="type()"
          (delete)="handleDeleteItem($event)"></app-list-item>
      }
    </ng-template>
  `,
  imports: [ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly type = input.required<CardType>();
  readonly nameProps = input.required<string>();
  readonly customClass = input('');

  readonly addNewItem = output<void>();
  readonly removeItem = output<number>();

  CardType = CardType;

  onDelete = (id: number): void => {
    this.removeItem.emit(id);
  };
}
