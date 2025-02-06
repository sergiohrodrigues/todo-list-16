import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TodoKeyLocalStorage } from 'src/app/models/enum/TodoKeyLocalStorage';
import { Todo } from 'src/app/models/model/todo.model';
import { TodoSignalsService } from 'src/app/services/todo-signals.service';
import { CustomUpperCasePipe } from 'src/app/shared/pipes/customUpperCase.pipe';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgTemplateOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    CustomUpperCasePipe
  ],
  templateUrl: './todo-card.component.html',
  styleUrls: []
})
export class TodoCardComponent implements OnInit {
  private todoSignalsService = inject(TodoSignalsService);
  private todosSignal = this.todoSignalsService.todosState;
  public todosList = computed(() => this.todosSignal());

  ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  private getTodosInLocalStorage() {
    const todosDatas = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST) as string;
    todosDatas && this.todosSignal.set(JSON.parse(todosDatas));
  }

  private saveTodosInLocalStorage(): void {
    this.todoSignalsService.saveTodoInLocalStorage();
  }

  public handleDoneTodo(todoId: number, completed: boolean): void {
    if(completed){
      this.updateStateTodo(todoId, completed)
      return;
    }

    if(todoId){
      this.updateStateTodo(todoId, completed)
    }
  }

  public updateStateTodo(todoId: number, completed: boolean){
    this.todosSignal.mutate((todos) => {
      const todoSelected = todos.find((todo) => todo.id === todoId) as Todo;
      todoSelected && (todoSelected.done = completed);
      this.saveTodosInLocalStorage();
    })
  }

  public handleDeleteTodo(todo: Todo): void {
    if(todo){
      const index = this.todosList().indexOf(todo);

      if(index !== -1){
        this.todosSignal.mutate((todos) => {
          todos.splice(index, 1);
          this.saveTodosInLocalStorage();
        })
      }
    }
  }

}
