import { GetAuthorsDataParams, IAuthorApp } from 'src/app/app.model';
import * as AuthorsActions from './authors.actions';

export interface IAuthorsState {
  filters: GetAuthorsDataParams;
  authors: IAuthorApp[];
  authors_count: number;
}

const initialState: IAuthorsState = {
  filters: {
    order: '',
    orderDirection: 'DESC',
    skip: 0,
    limit: 25,
    include: null,
    age_from: 0,
    age_to: 120,
    gender: '',
    name: null,
    author_data: null,
  },
  authors: [],
  authors_count: 0,
};

export function authorsReducer(
  state = initialState,
  action: AuthorsActions.AuthorsActions
): IAuthorsState {
  switch (action.type) {
    case AuthorsActions.GET_AUTHOR:
      return {
        ...state,
      };
    case AuthorsActions.SET_AUTHOR:
      return {
        ...state,
      };

    case AuthorsActions.SET_AUTHORS:
      return {
        ...state,
        authors: action.payload,
      };
    case AuthorsActions.SET_AUTHORS_COUNT:
      return {
        ...state,
        authors_count: action.payload,
      };
    case AuthorsActions.SET_POSTS_COUNT:
      const index = state.authors.indexOf(
        state.authors.filter((author) => author.id == action.payload.id)[0]
      );
      const updatedAuthor = {
        ...state.authors[index],
        posts_count: action.payload.posts_count,
      };
      const updatedAuthors = [...state.authors];
      updatedAuthors[index] = updatedAuthor;

      return {
        ...state,
        authors: [...updatedAuthors],
      };
    case AuthorsActions.APPLY_SORTING:
      const direction: 'ASC' | 'DESC' =
        action.payload.direction === 'asc' ? 'ASC' : 'DESC';
      const orderName =
        action.payload.direction === '' ? '' : action.payload.order;
      return {
        ...state,
        filters: {
          ...initialState.filters,
          skip: 0,
          order: orderName,
          orderDirection: direction,
        },
      };
    case AuthorsActions.APPLY_FILTER:
      const updatePayload = { ...action.payload };
      if (
        !(typeof action.payload.gender == 'string') &&
        (action.payload.gender.length == 0 ||
          action.payload.gender.length === 2)
      ) {
        updatePayload.gender = '';
      }

      const updatedFilter = { ...state.filters, ...updatePayload };

      return {
        ...state,
        filters: updatedFilter,
      };

    case AuthorsActions.CHANGE_PAGE:
      return {
        ...state,
        filters: {
          ...state.filters,
          skip: action.payload.pageIndex,
          limit: action.payload.pageSize,
        },
      };

    default:
      return state;
  }
}
