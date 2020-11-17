import { Actions, ofType, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { switchMap, toArray, tap, map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

import { environment } from '../../../environments/environment';
import * as AuthorActions from './author.actions';
import * as fromApp from '../../store/app.reducer';
import { IAuthorRecievedApp, ICommentRecievedApp } from 'src/app/app.model';





@Injectable()
export class AuthorEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store$: Store<fromApp.AppState>
  ) {}

  @Effect()
  getComments$ = this.actions$.pipe(
    ofType(AuthorActions.GET_COMMENTS),
    switchMap((data: { payload: number }) => {
      return this.http
        .get<ICommentRecievedApp[]>(
          `${environment.api}/Posts/${data.payload}/comments`
        )
        .pipe(
          mergeMap((res) => {
            return from(res).pipe(
              mergeMap((comment) =>
                this.http
                  .get<any>(`${environment.api}/Authors/${comment.authorId}`)
                  .pipe(
                    map((author: IAuthorRecievedApp) => {
                      const transformedComment: ICommentRecievedApp  = {
                        ...comment,
                        author_first_name: author.first_name,
                        author_last_name: author.last_name,
                      };
                      return transformedComment;
                    })
                  )
              ),
              toArray()
            );
          }),

          map((comments: ICommentRecievedApp[]) => {
            return new AuthorActions.SetComments(comments);
          })
        );
    })
  );
}
