import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from './todo.interface';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

const API = {
  getTodos: `${BASE_URL}`,
  updateTodo: (id: number) => `${BASE_URL}/${id}`,
  removeTodo: (id: number) => `${BASE_URL}/${id}`,
};

const OPTIONS = {
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
};

@Injectable({
  providedIn: 'root',
})
export class TodolistService {
  private readonly httpClient = inject(HttpClient);

  getTodos() {
    return this.httpClient.get<Todo[]>(API.getTodos);
  }

  updateItem(todo: Todo) {
    const payload = JSON.stringify({
      todo: todo.id,
      title: randText(),
      body: todo.body,
      userId: todo.userId,
    });

    return this.httpClient.put<Todo>(API.updateTodo(todo.id), payload, OPTIONS);
  }

  removeItem(id: number) {
    return this.httpClient.delete<void>(API.removeTodo(id), OPTIONS);
  }
}
