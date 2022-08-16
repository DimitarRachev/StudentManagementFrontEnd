import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private requestService:RequestService, private router: Router) { }

  form = {
    name: '',
    age: ''
  }
  ngOnInit(): void {
  }
  submit() {
    
    this.requestService.addStudent(this.form).subscribe();
    console.log(this.form);
    
    this.router.navigate(['students']);
  }
}
