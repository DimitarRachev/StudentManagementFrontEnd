import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Course } from '../model/Course';
import { RequestService } from '../request.service';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private requestService: RequestService,
    private snackBar: MatSnackBar) { }


  ngAfterViewInit(): void {
    this.getCourses();
  }

  courses: Course[] = [];

  ngOnInit(): void {
    // this.getCourses();
  }

  getCourses(): void {
    this.requestService.getCourses().subscribe(c => {
      this.courses = c;
      // console.log(c);

    });
  }

  displayedColumns: string[] = ['name', 'teacher'];
  dataSource = this.courses;


  addCorseuClick() { this.router.navigate(['addCourse']) }

  deleteCourseClick() { this.router.navigate(['deleteCourse']) }

  addTeacherToCourseClick() { this.router.navigate(['addTeacheToCourse']) }

  addStudentToCourseClick() { this.router.navigate(['addStudentToCourse']) }

  addDeleteStudentFromCourseClick() { this.router.navigate(['deleteStudentFromCourse']) }

  displayCourseInfo(row: Course) {
    this.requestService.getAvgForCourse(row.name).subscribe(r => {
      const result = r.map(e => e.name + " " + e.avgGrade).join('\n');
      this.snackBar.open(result, 'Dismiss', { duration: 5000, panelClass: ['success-snackbar'] });
    });
  }


}
