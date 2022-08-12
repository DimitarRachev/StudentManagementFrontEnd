import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-add-teacher-to-course',
  templateUrl: './add-teacher-to-course.component.html',
  styleUrls: ['./add-teacher-to-course.component.css']
})
export class AddTeacherToCourseComponent implements OnInit {

  constructor(private requestService:RequestService, private router: Router) { }
  form = {
    teacher: '',
    course: ''
  }

  ngOnInit(): void {
  }
  submit() {
    this.requestService.addTeacherToCourse(this.form).subscribe();
    this.router.navigate(['courses']);
  }
}
