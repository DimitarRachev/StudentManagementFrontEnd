import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentWithAge } from 'src/app/model/StudentWithAge';
import { RequestService } from 'src/app/request.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css']
})
export class DeleteStudentComponent implements OnInit, AfterViewInit {

  constructor(private requestService: RequestService, private router: Router) { }

  ngAfterViewInit(): void {
    this.requestService.getAllStudents().subscribe(c => this.objectOptions = c);
  }



  objectOptions: StudentWithAge[] = [];

  student: string = '';

  myControl = new FormControl();

  filteredOptions!: Observable<StudentWithAge[]>;

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(startWith(''), map(value => this._filter(value)));
  }

  private _filter(value: string): StudentWithAge[] {
    const filterValue = value.toLowerCase();
    return this.objectOptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  deleteStudent() {
    this.requestService.deleleStudent(this.student).subscribe();
    this.router.navigate(['students']);
  }
}
