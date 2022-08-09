import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { AddStudentToCourseComponent } from './course/add-student-to-course/add-student-to-course.component';
import { AddTeacherToCourseComponent } from './course/add-teacher-to-course/add-teacher-to-course.component';
import { CourseComponent } from './course/course.component';
import { DeleteCourseComponent } from './course/delete-course/delete-course.component';
import { DeleteStudentFromCourseComponent } from './course/delete-student-from-course/delete-student-from-course.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { DeleteStudentComponent } from './student/delete-student/delete-student.component';
import { StudentComponent } from './student/student.component';
import { AddTeacherComponent } from './teacher/add-teacher/add-teacher.component';
import { TeacherComponent } from './teacher/teacher.component';

const routes: Routes = [
  {path: 'students', component: StudentComponent},
  {path: 'addStudent', component: AddStudentComponent},
  {path: 'deleteStudent', component: DeleteStudentComponent},
  {path: 'teachers', component: TeacherComponent},
  {path: 'courses', component: CourseComponent},
  {path: 'addCourse', component: AddCourseComponent},
  {path: 'deleteCourse', component: DeleteCourseComponent},
  {path: 'addTeacheToCourse', component: AddTeacherToCourseComponent},
  {path: 'addStudentToCourse', component: AddStudentToCourseComponent},
  {path: 'deleteStudentFromCourse', component: DeleteStudentFromCourseComponent},
  {path: 'add-teacher', component: AddTeacherComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
