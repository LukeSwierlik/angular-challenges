import { Component } from '@angular/core';
import { CityCardComponent } from './component/city-card/city-card.component';
import { StudentCardComponent } from './component/student-card/student-card.component';
import { TeacherCardComponent } from './component/teacher-card/teacher-card.component';

@Component({
  selector: 'app-root',
  template: `
    <div
      class="mx-auto my-5 flex w-[1024px] justify-between rounded-md bg-gray-100 p-5">
      <app-teacher-card />
      <app-student-card />
      <app-city-card />
    </div>
  `,
  imports: [TeacherCardComponent, StudentCardComponent, CityCardComponent],
})
export class AppComponent {}
