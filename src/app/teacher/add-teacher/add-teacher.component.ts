import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Teacher } from 'src/app/model/Teacher';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  constructor(private router: Router, private requestService: RequestService) { }


  teacher: Teacher = {
    name: '',
    degree: ''
  }

  ngOnInit(): void {
  }

  submit() {
    this.requestService.addTeacher(this.teacher).subscribe();
    this.router.navigate(['teachers']);
  }

}
