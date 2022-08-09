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
    const header = this.authService.getHeader();
    return this.http.get<Course[]>(uri, { headers: header });
  }

  getAvgForCourse(name: string): Observable<AvgCourse[]> {
    const uri = this.baseUri + this.courses + '/' + name;
    const header = this.authService.getHeader();
    return this.http.get<AvgCourse[]>(uri, { headers: header })
  }

  deleleCourse(course: string): Observable<any> {
    const url = this.baseUri + this.courses + '/' + course;
    console.log(url);

    const header = this.authService.getHeader();
    return this.http.delete(url, { headers: header });
  }

  addCourse(course: {}): Observable<any> {
    const url = this.baseUri + this.courses;
    const header = this.authService.getHeader();
    return this.http.post(url, course, { headers: header });
  }

  addTeacherToCourse(form: { teacher: string, course: string }): Observable<any> {
    const url = this.baseUri + this.courses + '/' + form.course + '/addTeacher/' + form.teacher;
    const header = this.authService.getHeader();
    return this.http.put(url, form, { headers: header });
  }

  addStudentToCourse(form: { student: string, course: string }): Observable<any> {
    const url = this.baseUri + this.courses + '/' + form.course + '/addStudent/' + form.student;
    const header = this.authService.getHeader();
    return this.http.put(url, form, { headers: header });
  }

  removeStudentFromCourse(form: { student: string, course: string }): Observable<any> {
    const url = this.baseUri + this.courses + '/' + form.course + '/removeStudent/' + form.student;
    const header = this.authService.getHeader();
    //todo find out why without pasing  form in request, responce is 403
    return this.http.put(url, form, { headers: header });
  }

  getAllStudents(): Observable<StudentWithAge[]> {
    const url = this.baseUri + this.students + '/withAge';
    const header = this.authService.getHeader();
    return this.http.get<StudentWithAge[]>(url, { headers: header });
  }

  addStudent(student: { name: string, age: string }): Observable<any> {
    const url = this.baseUri + this.students;
    const header = this.authService.getHeader();
    return this.http.post(url, student, { headers: header });
  }

  deleleStudent(student: string): Observable<any> {
    const url = this.baseUri + this.students + '/' + student;
    const header = this.authService.getHeader();
    return this.http.delete(url, { headers: header });
  }

  getTeachers(pageNumber: number, pageSize: number, order: string, sortField: String): Observable<any> {
    const url = this.baseUri + this.teachers + "?page=" + pageNumber + "&size=" + pageSize +
      "&order=" + order + "&sortField=" + sortField;
    const headers = this.authService.getHeader();
    return this.http.get<any>(url, { headers: headers });
  }

  getAvgForStudent(name: string) {
    const url = this.baseUri + this.students + '/' + name;
    const header = this.authService.getHeader();
    return this.http.get<string>(url, { headers: header });
  }

  deleteTeacher(name: string) {
    const url = this.baseUri + this.teachers + '/' + name;
    const header = this.authService.getHeader();
    return this.http.delete(url, { headers: header });
  }
}
