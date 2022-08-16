import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-delete-student-from-course',
  templateUrl: './delete-student-from-course.component.html',
  styleUrls: ['./delete-student-from-course.component.css']
})
export class DeleteStudentFromCourseComponent implements OnInit {

  constructor(private requestService:RequestService, private router: Router) { }
  form = {
    student: '',
    course: ''
  }
  ngOnInit(): void {
  }
  submit() {
    this.requestService.removeStudentFromCourse(this.form).subscribe();
    this.router.navigate(['courses']);
  }
}
