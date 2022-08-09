import { NgModule } from '@angular/core';
import{ MatButtonModule } from '@angular/material/button'
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';


const MaterialComponents = [
MatButtonModule,
MatButtonToggleModule,
MatSidenavModule,
MatFormFieldModule,
MatInputModule,
MatAutocompleteModule,
MatSnackBarModule,
MatPaginatorModule,
MatTableModule,
MatSortModule,
MatPaginatorModule,
MatSelectModule
];


@NgModule({

  imports: [
    MaterialComponents
  ],
  exports: [MaterialComponents]
})
export class MaterialModule { }
