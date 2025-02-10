import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/model/todo.model';
import { TodoKeyLocalStorage } from '../models/enum/TodoKeyLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class TodoSignalsService {
  public todosState = signal<Array<Todo>>([]);

  public updateTodos({ id, title, description, done }: Todo): void {
    if((id && title && description !== null) || undefined ){
      this.todosState.mutate((todos) => {
        if(todos !== null){
          todos.push(new Todo(id, title, description, done));
        }
      })
      this.saveTodoInLocalStorage();
    }
  }

  public editTodo({ id, title, description, done}: Todo){
    if((id && title && description !== null) || undefined ){
      this.todosState.mutate((todos) => {
        if(todos !== null){
          const todoIndex = todos.findIndex(todo => todo.id === id);

          if(todoIndex !== -1){
            todos[todoIndex].title = title;
            todos[todoIndex].description = description;
            todos[todoIndex].done = done;
          }
        }
      })
      this.saveTodoInLocalStorage();
    }
  }

  public saveTodoInLocalStorage(): void {
    const todos = JSON.stringify(this.todosState());
    localStorage.setItem(TodoKeyLocalStorage.TODO_LIST, todos);
  }

}
