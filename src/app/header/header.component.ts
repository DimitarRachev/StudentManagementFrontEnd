import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  @Output() menuClick: EventEmitter<any> = new EventEmitter();

  title: string = 'Student Management';
  ngOnInit(): void {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  login() {
    this.router.navigate(['login'])
  }

  register() {
    this.router.navigate(['register'])
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  toggleMenu() {    
    this.menuClick.emit();
  }
}
