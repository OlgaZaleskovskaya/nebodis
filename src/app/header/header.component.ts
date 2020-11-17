import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';


import * as fromApp from '../store/app.reducer';
import * as AuthorsActions from '../authors/store/authors.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {}

  toAuthorsPage() {
    this.store.dispatch(new AuthorsActions.ChangePage({pageIndex:0, pageSize:25}));
    this.router.navigate(['./authors']);
  }
}
