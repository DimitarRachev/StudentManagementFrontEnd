import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  constructor(private requestService:RequestService, private router: Router) { }

  form = {
    name: '',
    duration: ''
  }
  ngOnInit(): void {
  }


  submit() {
    this.requestService.addCourse(this.form).subscribe();
    this.router.navigate(['courses']);
  }

}
