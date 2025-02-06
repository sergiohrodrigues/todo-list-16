import { Component, EventEmitter, inject, Input, OnInit, Output, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { filter, from, map, Observable, of, Subject, switchMap, takeUntil, zip } from 'rxjs';
import { TodoSignalsService } from './services/todo-signals.service';
import { Todo } from './models/model/todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TodoCardComponent,
  ],
  animations: [],
  templateUrl: './app.component.html',
  styleUrls: []
})

export class AppComponent
implements OnInit
{
  private schoolService = inject(SchoolService);
  public students: Array<SchoolData> = [];
  public teachers: Array<SchoolData>= [];
  private readonly destroy$: Subject<void> = new Subject();

  private ages = of(20, 30, 40, 50, 60, 70);

  private peoplesDatas = from([
    { name: 'Marcos Junior', idade : 20, profession: 'Software Developer' },
    { name: 'Sergio Rodrigues', idade : 30, profession: 'Fullstack Developer' },
    { name: 'Thiago Queiroz', idade : 21, profession: 'Backend Developer' },
    { name: 'Joao Queiroz', idade : 21, profession: 'Software Developer' },
    { name: 'Erik Queiroz', idade : 21, profession: 'Software Developer' },
  ])

  private studentUserId = '2';

  private zipSchoolResponse$ = zip(
    this.getStudentsDatas(),
    this.getTeachersDatas()
  );

  ngOnInit(): void {
    // this.getSchoolDatas();
    // this.getMultiplieAges();
    // this.getPeopleProfessions()
    // this.getSoftwareDeveloperNames()
    //this.handleFindStudentsById();
  }

  handleFindStudentsById() {
    this.getStudentsDatas()
      .pipe(
        switchMap((students) => this.findStudentsById(students, this.studentUserId))
      )
      .subscribe({
        next: (response) => {
          console.log('RETORNO ESTUDANTE FILTRADO', response)
        }
      })
  }

  public findStudentsById( students: Array<SchoolData>, userId: string ){
    return of(students.find((student) => student.id === userId))
  }

  getMultiplieAges() {
    this.ages.pipe(map((age) => age * 2)).subscribe({
      next: (response) => {
        console.log(response)
      }
    })
  }

  getPeopleProfessions(): void {
    this.peoplesDatas
    .pipe(map((people) => people.profession))
    .subscribe({
      next: (response) => {
        console.log('PROFISSÃO ', response)
      }
    })
  }

  getSchoolDatas(): void {
    this.zipSchoolResponse$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        console.log('STUDENTS', response[0])
        console.log('TEACHERS', response[1])
      }
    })
  }


  getSoftwareDeveloperNames(): void {
    this.peoplesDatas
    .pipe(
      filter((people) => people.profession === "Software Developer"),
      map((people) => people.name)
    )
    .subscribe({
      next: (response) => {
        console.log('NOME DO DESENVOLVEDOR', response)
      }
    })
  }

  getStudentsDatas(): Observable<Array<SchoolData>> {
    return this.schoolService.getStudents();
  }

  getTeachersDatas(): Observable<Array<SchoolData>> {
    return this.schoolService.getTeachers();
  }


  @Input() public projectName!: string;
  @Output() outputEvent = new EventEmitter<string>();
  public title = 'todo-list-16';
  public todoSignal!: WritableSignal<Todo[]>;
  public isDoned = false;

  public renderTestMessage: boolean = false;

  constructor(private todoSignalsService: TodoSignalsService){}

  public handleEmitEvent(): void {
    this.outputEvent.emit(this.projectName);
  }

  public handleCreateTodo(todo: Todo): void {
    if(todo){
      this.todoSignalsService.updateTodos(todo);
      this.todoSignal = this.todoSignalsService.todosState;
    }
  }

  public handleCheckIsDone(): void {
    setTimeout(() => {
      this.isDoned = true;
    }, 200)
  }
}
