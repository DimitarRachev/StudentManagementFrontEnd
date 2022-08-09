import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStudentFromCourseComponent } from './delete-student-from-course.component';

describe('DeleteStudentFromCourseComponent', () => {
  let component: DeleteStudentFromCourseComponent;
  let fixture: ComponentFixture<DeleteStudentFromCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteStudentFromCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteStudentFromCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
