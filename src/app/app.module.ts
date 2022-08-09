import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './sidenav/sidenav.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { HeaderComponent } from './header/header.component';
import { AddTeacherComponent } from './teacher/add-teacher/add-teacher.component';
import { RegisterComponent } from './auth/register/register.component';
import { CourseComponent } from './course/course.component';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { AddTeacherToCourseComponent } from './course/add-teacher-to-course/add-teacher-to-course.component';
import { AddStudentToCourseComponent } from './course/add-student-to-course/add-student-to-course.component';
import { DeleteCourseComponent } from './course/delete-course/delete-course.component';
import { DeleteStudentFromCourseComponent } from './course/delete-student-from-course/delete-student-from-course.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { DeleteStudentComponent } from './student/delete-student/delete-student.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    StudentComponent,
    TeacherComponent,
    HeaderComponent,
    AddTeacherComponent,
    RegisterComponent,
    CourseComponent,
    AddCourseComponent,
    AddTeacherToCourseComponent,
    AddStudentToCourseComponent,
    DeleteCourseComponent,
    DeleteStudentFromCourseComponent,
    AddStudentComponent,
    DeleteStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
