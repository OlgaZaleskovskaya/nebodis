import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as AuthorsActions from '../../authors/store/authors.actions';

import { IAuthorApp} from 'src/app/app.model';
type Sort = { active: string; direction: string };

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements AfterViewInit, OnInit {
  stateSubscription: Subscription;
  authors: IAuthorApp[];
  authors_count: number;
  current_page: number;
  page_size: number;
   currentOrder: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = [
    'first_name',
    'date_of_birth',
    'gender',
    'email',
    'phone',
    'country',
    'posts_count',
  ];
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.current_page = 0;
    this.page_size = 25;
    this.stateSubscription = this.store.select('authors').subscribe((state) => {
      this.authors = state.authors;
      this.authors_count = state.authors_count;
      this.current_page = state.filters.skip + 1;
      this.page_size == state.filters.limit + 1;
    });
  }

  ngAfterViewInit() {
  /*   this.paginator.page
      .pipe(
        tap((_) => {
          this.store.dispatch(
            new AuthorsActions.ChangePage({
              pageIndex: this.paginator.pageIndex,
              pageSize: this.paginator.pageSize,
            })
          );
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe((sortObj: Sort) => {
      this.store.dispatch(
        new AuthorsActions.ApplySorting({
          order: sortObj.active,
          direction: sortObj.direction,
        })
      );
    }); */
  }

 getAuthor(el: any) {
    this.store.dispatch(
      new AuthorsActions.GetAuthor(el.id)
    );

  }
}
