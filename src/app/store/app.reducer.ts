import { ActionReducerMap } from '@ngrx/store';
import * as fromAuthors from '../authors/store/authors.reducer';
import * as fromAuthor from '../author/store/author.reducer';

export interface AppState {
  authors: fromAuthors.IAuthorsState;
  author: fromAuthor.IAuthorState;
}

export const appReducer: ActionReducerMap<AppState> = {
  authors: fromAuthors.authorsReducer,
  author: fromAuthor.authorReducer,
};
