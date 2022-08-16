import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/model/LoginForm';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  form = {
    username:'',
    password:'',
    confirmPassword:''
  }

  ngOnInit(): void {
  }

  submit() {
    let credentials: LoginForm = {
      username: this.form.username,
      password: this.form.password
    };
    

    this.authService.register(credentials);
    this.router.navigate(['login']);
  }

}
