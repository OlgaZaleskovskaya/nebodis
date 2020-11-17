import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

import * as AuthorActions from '../store/author.actions';
import { IAuthorApp, IPostRecievedApp } from 'src/app/app.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {
  author: IAuthorApp;
  posts: IPostRecievedApp[];

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.select('author').subscribe((state) => {
      this.author = state.currentAuthor;
      this.posts = state.posts;
    });
  }

  toPostPage(id: number) {
    this.store.dispatch(new AuthorActions.GetComments(id));
    this.router.navigateByUrl('/author/post');
  }
}
