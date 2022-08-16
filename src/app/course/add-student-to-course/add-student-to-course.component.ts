import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-add-student-to-course',
  templateUrl: './add-student-to-course.component.html',
  styleUrls: ['./add-student-to-course.component.css']
})
export class AddStudentToCourseComponent implements OnInit {

  constructor(private requestService:RequestService, private router: Router) { }
  form = {
    student: '',
    course: ''
  }
  ngOnInit(): void {
  }
  submit() {
    this.requestService.addStudentToCourse(this.form).subscribe();
    this.router.navigate(['courses']);
  }
}
