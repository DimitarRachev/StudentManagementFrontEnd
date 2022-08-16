import { Component, OnInit, Input } from '@angular/core';
import { localeData } from 'moment';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

 isOpen: boolean = false ;
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(): void {    
    this.isOpen = !this.isOpen;
  }

}
