import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Teacher } from '../model/Teacher';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { RequestService } from '../request.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit, AfterViewInit {

  constructor(private snackBar: MatSnackBar, private router: Router, private http: HttpClient, private requestService: RequestService) { }

  teachers: Teacher[] = [];

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.getTeachers();
  }

  @Input() teacher!: Teacher;

  openSnackBar(message: string, action: string) {
    let snackBarRef = this.snackBar.open(message, action, { duration: 3000 });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The cnackBar was Dismissed');
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('Action was triggered');

    })
  }

  // SimpleNotification 
  //after DUration ends call Dismiss, nevermind the action implemented
  // openSnackBar(message: string, action: string) {
  // this.snackBar.open(message, action, {duration: 2000});
  // }

  addTeacherClick() {
    this.router.navigate(['add-teacher']);
  }

  addTeacher() {
    console.log('teacher');
  }

  displayedColumns: string[] = ['name', 'degree'];

  totalRaws = 0;
  currentPage = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  order: string = "ASC"
  orderField: string = "name"
  dataSources = new MatTableDataSource<Teacher>();

  getTeachers(): void {
    this.requestService.getTeachers(this.currentPage, this.pageSize, this.order, this.orderField).subscribe(t => {

      // setTimeout(() => {
      this.dataSources.data = t.content;
      this.paginator.pageIndex = t.number;
      this.paginator.length = t.totalElements;
      this.paginator.pageSize = t.size;
      // });

    });
  };




  orders: string[] = ["ASC", "DESC"]
  orderColumns: any[] = [{ columnId: "name", columnValue: "name" }, { columnId: "degree", columnValue: "degree" }]

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getTeachers();
  }

  reloadDataOrdered(filterValue: string) {
    this.order = filterValue;
    this.getTeachers();
  }

  displayTeacher(teacher: Teacher) {
    const message = 'Teacher: ' + teacher.name + ', with degree: ' + teacher.degree + '.'
    let snackBarRef = this.snackBar.open(message, 'Delete', { duration: 3000 });
    snackBarRef.onAction().subscribe(() => {
        this.requestService.deleteTeacher(teacher.name).subscribe();
    });
  }
}
