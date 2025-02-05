import { TestBed } from '@angular/core/testing';

import { ExampleTestService } from '../example-test.service';
import { TodoSignalsService } from '../todo-signals.service';
import { Todo } from 'src/app/models/model/todo.model';

describe('ExampleTestService', () => {
  let service: ExampleTestService;
  let todoService: TodoSignalsService;

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    service = TestBed.inject(ExampleTestService);
    todoService = TestBed.inject(TodoSignalsService);
  });

  it('should return correct list', () => {
    service.getTestNamesList()
      .subscribe({
        next: (list) => {
          expect(list).toEqual([
            {
              id: 1,
              name: 'Teste 1'
            },
            {
              id: 2,
              name: 'Test 2'
            }
          ])
        }
      })
  });

  it("should return correct todo list", () => {
    jest.spyOn(todoService, 'updateTodos')

    const newTodo: Todo = {
      id: 1,
      title: 'New Todo',
      description: 'Description for test',
      done: true
    }

    service.handleCreateTodo(newTodo).subscribe({
      next: (todoList) => {
        expect(todoList).toEqual([newTodo]);
        expect(todoService.updateTodos).toHaveBeenCalledWith(newTodo);
      }
    })

  })
});
