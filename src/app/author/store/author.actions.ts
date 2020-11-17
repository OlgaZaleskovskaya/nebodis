import { Action } from '@ngrx/store/src';
import { IAuthorApp, IPostRecievedApp, ICommentRecievedApp, } from 'src/app/app.model';

export const SET_AUTHOR = '[Author] Set author';
export const SET_COMMENTS = '[Author] Set comment';
export const GET_COMMENTS = '[Author] Get comments';

export class SetAuthor implements Action {
  readonly type = SET_AUTHOR;
  constructor(public payload: { author: IAuthorApp; posts: IPostRecievedApp[] }) {}
}

export class GetComments implements Action {
  readonly type = GET_COMMENTS;
  constructor(public payload: number) {}
}

export class SetComments implements Action {
  readonly type = SET_COMMENTS;
  constructor(public payload: ICommentRecievedApp[]) {}
}

export type AuthorActions = SetAuthor | GetComments | SetComments;
