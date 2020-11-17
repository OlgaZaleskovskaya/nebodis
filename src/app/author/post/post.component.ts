import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

import { IAuthorApp, ICommentRecievedApp, IPostRecievedApp } from 'src/app/app.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  author: IAuthorApp;
  post: IPostRecievedApp;
  comments: ICommentRecievedApp[];

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('author').subscribe((state) => {
      this.author = state.currentAuthor;
      this.post = state.currentPost;
      this.comments = state.currentComments;

    });
  }
}
