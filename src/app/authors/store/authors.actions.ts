import { Action } from '@ngrx/store/src';

import {
  GetAuthorsDataParams,
  IAuthorApp,
  IPage,
} from 'src/app/app.model';


export const GET_AUTHOR = '[Authors] Get author';
export const SET_AUTHOR = '[Authors] Set author';
export const SET_AUTHORS = '[Authors] Set authors';
export const APPLY_FILTER = '[Authors] Apply filter';
export const APPLY_SORTING = '[Authors] Apply sorting';
export const CHANGE_PAGE = '[Authors] Change page';
export const GET_POST_COUNT = '[Authors] Get postCount';
export const SET_POSTS_COUNT = '[Authors] Set postsCount';
export const GET_AUTHORS_COUNT = '[Authors] Get authorsCount';
export const SET_AUTHORS_COUNT = '[Authors] Set authorsCount';


export class GetAuthor implements Action {
  readonly type = GET_AUTHOR;
  constructor(public payload: number) {}
}

export class SetAuthor implements Action {
  readonly type = SET_AUTHOR;
  constructor(public payload:number) {}
}

export class SetAuthors implements Action {
  readonly type = SET_AUTHORS;
  constructor(public payload: IAuthorApp[]) {}
}

export class ApplyFilter implements Action {
  readonly type = APPLY_FILTER;
  constructor(public payload: {[key: string]:  any}) {}
}

export class ApplySorting implements Action {
  readonly type = APPLY_SORTING;
  constructor(public payload: {order: string, direction: string}){}
}

export class ChangePage implements Action {
  readonly type = CHANGE_PAGE;
  constructor(public payload: IPage) {}
}

export class GetPostCount implements Action {
  readonly type = GET_POST_COUNT;
  constructor() {}
}

export class SetPostsCount implements Action {
  readonly type = SET_POSTS_COUNT;
  constructor(public payload: {id: number, posts_count: number}) {}
}

export class GetAuthorsCount implements Action {
  readonly type = GET_AUTHORS_COUNT;
  constructor(public payload: GetAuthorsDataParams) {}
}

export class SetAuthorsCount implements Action {
  readonly type = SET_AUTHORS_COUNT;
  constructor(public payload: number) {}
}


export type AuthorsActions =
  | GetAuthor
  | SetAuthor
  | SetAuthors
  | GetAuthorsCount
  | SetAuthorsCount
  | ApplyFilter
  | ChangePage
  | ApplySorting
  | GetPostCount
  | SetPostsCount
  ;
