import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Course } from 'src/app/model/Course';
import { RequestService } from 'src/app/request.service';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.css']
})
export class DeleteCourseComponent implements OnInit, AfterViewInit {

  constructor(private requestService: RequestService, private router: Router) { }

  ngAfterViewInit(): void {
    this.requestService.getCourses().subscribe(c => this.objectOptions = c);
  }



  course: string = '';

  objectOptions: Course[] = [];

  myControl = new FormControl();

  filteredOptions!: Observable<Course[]>;

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(startWith(''), map(value => this._filter(value)));
  }


  private _filter(value: string): Course[] {
    const filterValue = value.toLowerCase();
    return this.objectOptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  deleteCourse() {
    this.requestService.deleleCourse(this.course).subscribe();
    this.router.navigate(['courses']);
  }

}
