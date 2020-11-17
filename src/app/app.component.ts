import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthorsActions from './authors/store/authors.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'nebodisProject';



  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {}

  toAuthorsPage() {
    this.store.dispatch(new AuthorsActions.ChangePage({pageIndex:0, pageSize:25}));
    this.router.navigate(['./authors']);
  }
}
