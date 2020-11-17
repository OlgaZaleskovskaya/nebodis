import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';

import { AuthorsRoutingModule } from './authors-routing.module'
import { AuthorsComponent } from './authors/authors.component';

import { DataTableComponent } from './data-table/data-table.component';
import { FiltersComponent } from './data-table/filters/filters.component';

import { CapitalLetterPipe } from './data-table/filters/capitalLetter.pipe';




@NgModule({
  declarations: [AuthorsComponent, DataTableComponent, FiltersComponent, CapitalLetterPipe],
  imports: [
    CommonModule, AuthorsRoutingModule, MaterialModule, ReactiveFormsModule
  ],
  providers: []
})
export class AuthorsModule { }
