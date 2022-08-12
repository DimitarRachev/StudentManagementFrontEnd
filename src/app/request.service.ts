import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { AvgCourse } from './model/AvgCourse';
import { Course } from './model/Course';
import { StudentWithAge } from './model/StudentWithAge';
import { Teacher } from './model/Teacher';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  private baseUri = 'http://localhost:8008';
  private teachers = '/teachers';
  private courses = '/courses';
  private students = '/students';

  getCourses(): Observable<Course[]> {
    const uri = this.baseUri + this.courses + '/allWithoutGrades';
    return this.http.get<Course[]>(uri);
  }

  getAvgForCourse(name: string): Observable<AvgCourse[]> {
    const uri = this.baseUri + this.courses + '/' + name;
    return this.http.get<AvgCourse[]>(uri)
  }

  deleleCourse(course: string): Observable<any> {
    const url = this.baseUri + this.courses + '/' + course;
    console.log(url);
    return this.http.delete(url);
  }

  addCourse(course: {}): Observable<any> {
    const url = this.baseUri + this.courses;
    return this.http.post(url, course);
  }

  addTeacherToCourse(form: { teacher: string, course: string }): Observable<any> {
    const url = this.baseUri + this.courses + '/' + form.course + '/addTeacher/' + form.teacher;
    return this.http.put(url, form);
  }

  addStudentToCourse(form: { student: string, course: string }): Observable<any> {
    const url = this.baseUri + this.courses + '/' + form.course + '/addStudent/' + form.student;
    return this.http.put(url, form);
  }

  removeStudentFromCourse(form: { student: string, course: string }): Observable<any> {
    const url = this.baseUri + this.courses + '/' + form.course + '/removeStudent/' + form.student;
    return this.http.put(url, form);
  }

  getAllStudents(): Observable<StudentWithAge[]> {
    const url = this.baseUri + this.students + '/withAge';
    return this.http.get<StudentWithAge[]>(url);
  }

  addStudent(student: { name: string, age: string }): Observable<any> {
    const url = this.baseUri + this.students;
    return this.http.post(url, student );
  }

  deleleStudent(student: string): Observable<any> {
    const url = this.baseUri + this.students + '/' + student;
    return this.http.delete(url);
  }

  getTeachers(pageNumber: number, pageSize: number, order: string, sortField: String): Observable<any> {
    const url = this.baseUri + this.teachers + "?page=" + pageNumber + "&size=" + pageSize +
      "&order=" + order + "&sortField=" + sortField;
    return this.http.get<any>(url);
  }

addTeacher(teacher: Teacher) {
  const url = this.baseUri + this.teachers;
  return this.http.post<Teacher>(url, teacher);
}

  getAvgForStudent(name: string) {
    const url = this.baseUri + this.students + '/' + name;
    return this.http.get<string>(url);
  }

  deleteTeacher(name: string) {
    const url = this.baseUri + this.teachers + '/' + name;
    return this.http.delete(url);
  }
}
