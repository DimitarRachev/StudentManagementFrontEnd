import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StudentWithAge } from '../model/StudentWithAge';
import { RequestService } from '../request.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, AfterViewInit {

  constructor(private requestService: RequestService, private router: Router, private snackBar: MatSnackBar) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSources = new MatTableDataSource<Object>();

  ngAfterViewInit(): void {
    this.requestService.getAllStudents().subscribe(s =>{
      this.dataSources.data = s;
      this.dataSources.sort = this.sort;
    this.dataSources.paginator =this.paginator;});
  }

  ngOnInit(): void {  }

  displayedColumns: string[] = ['name', 'age'];

  addStudentClick() { this.router.navigate(['addStudent']) };
  deleteStudentClick() { this.router.navigate(['deleteStudent']) };

  displayStudent(row: StudentWithAge): void {

  this.requestService.getAvgForStudent(row.name).subscribe(r => {
    this.snackBar.open(r, 'Dismiss', {duration: 3000});
  });
  //  this.snackBar.open(result, 'Dismiss', {duration: 3000});
  }

  applyFilter(event: any) {
    this.dataSources.filter = event.target.value.trim().toLowerCase();
  }
}
