import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { Observable, Subject, takeUntil, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TodoCardComponent,
],
  templateUrl: './app.component.html',
  styleUrls: []
})

export class AppComponent implements OnInit {
  title = 'todo-list-16';
  private schoolService = inject(SchoolService);
  public students: Array<SchoolData> = [];
  public teachers: Array<SchoolData>= [];
  private readonly destroy$: Subject<void> = new Subject();

  private zipSchoolResponse$ = zip(
    this.getStudentsDatas(),
    this.getTeachersDatas()
  );

  ngOnInit(): void {
    this.getSchoolDatas();
  }

  getSchoolDatas() {
    this.zipSchoolResponse$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('STUDENTS', response[0])
          console.log('TEACHERS', response[1])
        }
      })
  }

  getStudentsDatas(): Observable<Array<SchoolData>> {
    return this.schoolService.getStudents();
  }

  getTeachersDatas(): Observable<Array<SchoolData>> {
    return this.schoolService.getTeachers();
  }
}
