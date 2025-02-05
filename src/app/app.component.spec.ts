import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { first } from 'rxjs';
import { TodoSignalsService } from './services/todo-signals.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Todo } from './models/model/todo.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoSignalsService: TodoSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule, NoopAnimationsModule],
      providers: [ TodoSignalsService ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoSignalsService = TestBed.inject(TodoSignalsService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Teste de @Input()
  it('should set @Input property correctly', () => {
    component.projectName = "Testing ANgular With Jest";

    fixture.detectChanges();

    expect(component.projectName).toEqual("Testing ANgular With Jest")
  })

  //Teste de @Output() e @Input()
  it("should emit event with @Output() decorator correctly", () => {
    component.projectName = "Testing my Angular application";

    component.outputEvent.pipe(first()).subscribe({
      next: (event) => {
        expect(event).toEqual("Testing my Angular application");~
        component.handleEmitEvent();
      }
    })
  })

  // Teste de um acionamento de serviço e de um "Signal"
  it("should create new todo correctly and call service method", () => {
    jest.spyOn(todoSignalsService, 'updateTodos');

    const newTodo: Todo = {
      id: 1,
      title: 'Testing creating todo',
      description: 'Test new Todo',
      done: true
    }

    component.handleCreateTodo(newTodo);

    fixture.detectChanges();

    expect(todoSignalsService.updateTodos).toHaveBeenCalledWith(newTodo);

    expect(component.todoSignal()).toEqual([newTodo]);
  })

  it("should not render paragraph in the DOM", () => {
    const componenteDebugElement: DebugElement = fixture.debugElement;
    const element: HTMLElement = componenteDebugElement.nativeElement;
    const paragraph = element.querySelector('p');

    expect(paragraph).toBeNull();
  })

  it("should render paragraph correctly", () => {
    component.renderTestMessage = true;

    fixture.detectChanges();

    const componentDebugElement: DebugElement = fixture.debugElement;
    const paragraphDebugElement = componentDebugElement.query(By.css('p'));
    const paragraph: HTMLElement = paragraphDebugElement.nativeElement;

    expect(paragraph.textContent).toEqual("Test your Angular application")
  })

});
