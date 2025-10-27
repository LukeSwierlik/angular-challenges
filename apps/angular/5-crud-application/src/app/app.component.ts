import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Todo } from './services/todo.interface';
import { TodolistService } from './services/todolist.service';

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    <div class="mx-auto my-0 flex w-[1024px] flex-col gap-4 bg-gray-100 p-4">
      @if (!isLoading()) {
        @for (todo of todos(); track todo.id) {
          <div class="flex justify-between gap-4">
            <p>{{ todo.title }}</p>

            <div class="flex gap-2">
              <button (click)="update(todo)" class="rounded bg-green-300 p-2">
                Update
              </button>

              <button (click)="remove(todo.id)" class="rounded bg-red-300 p-2">
                Remove
              </button>
            </div>
          </div>
        }
      } @else {
        <div>Loading...</div>
      }
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private readonly todosService = inject(TodolistService);
  private readonly destroyRef = inject(DestroyRef);

  todos = signal<Todo[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.isLoading.set(true);

    this.todosService
      .getTodos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((todos) => {
        this.todos.set(todos);
        this.isLoading.set(false);
      });
  }

  update(todo: Todo): void {
    this.todosService
      .updateItem(todo)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((updated: Todo) => {
        this.todos.update((arr) =>
          arr.map((item) => (item.id === updated.id ? updated : item)),
        );
      });
  }

  remove(id: number): void {
    this.todosService
      .removeItem(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.todos.update((arr) => {
          return arr.filter((item) => item.id !== id);
        });
      });
  }
}
