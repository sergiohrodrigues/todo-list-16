import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';

import { TodoSignalsService } from 'src/app/services/todo-signals.service';
import { NotificationCard } from 'src/app/services/notification-card.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  providers: [NotificationCard, MatSnackBar]

})
export class TodoFormComponent {
  private todoSignalsService = inject(TodoSignalsService);
  private dialogRefService = inject(MatDialogRef<HeaderComponent>);
  public notification = inject(NotificationCard);
  public allTodos = this.todoSignalsService.todosState();

  public todosForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  public handleCreateNewTOdo(): void{
    if(this.todosForm.value && this.todosForm.valid){
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
  }

  handleCloseModal(): void {
    this.dialogRefService.close();
  }

}
