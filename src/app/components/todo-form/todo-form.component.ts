import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';

import { TodoSignalsService } from 'src/app/services/todo-signals.service';
import { NotificationCard } from 'src/app/services/notification-card.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from 'src/app/models/model/todo.model';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './todo-form.component.html',
  styleUrls: [],
  providers: [NotificationCard, MatSnackBar, MatDialogConfig]

})
export class TodoFormComponent implements OnInit {
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    if(this.data && this.data.todoSelected){
      const todoSelected: Todo = this.data.todoSelected;

      this.todosForm.patchValue({
        title: todoSelected.title,
        description: todoSelected.description
      })
    }
  }

  private todoSignalsService = inject(TodoSignalsService);
  private dialogRefService = inject(MatDialogRef<HeaderComponent>);
  public notification = inject(NotificationCard);
  public allTodos = this.todoSignalsService.todosState();

  public todosForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  public handleCreateNewTodoOrEdit(): void{
    if(this.todosForm.value && this.todosForm.valid){
      if(!this.data){
        this.handleAddTodo();
      } else {
        this.handleEditTodo();
      }
    }
  }

  public handleEditTodo(): void{
    const title = String(this.todosForm.controls['title'].value);
    const description = String(this.todosForm.controls['description'].value);
    const id = this.data.todoSelected.id;
    const done = this.data.todoSelected.done;

    this.todoSignalsService.editTodo({id, title, description, done})
    this.dialogRefService.close();
    setTimeout(() => {
        this.notification.openSnackBar("Item editado com sucesso!")
      }, 200)
  }

  public handleAddTodo(): void {
    const title = String(this.todosForm.controls['title'].value);
    const description = String(this.todosForm.controls['description'].value);
    const id = this.allTodos.length > 0 ? this.allTodos.length + 1 : 1;
    const done = false;

    this.todoSignalsService.updateTodos({id, title, description, done})
    this.dialogRefService.close();
    setTimeout(() => {
        this.notification.openSnackBar("Item criado com sucesso!")
      }, 200)
  }

  handleCloseModal(): void {
    this.dialogRefService.close();
  }

}
