import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Teacher } from 'src/app/model/Teacher';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }


  teacher: Teacher = {
    name: '',
    degree: ''
  }

  ngOnInit(): void {
  }

  submit() {
    const url = 'http://localhost:8008/teachers';
    const headers = this.authService.getHeader();
    this.http.post<Teacher>(url, this.teacher, { headers: headers }).subscribe();
    this.router.navigate(['teachers']);
  }

}
