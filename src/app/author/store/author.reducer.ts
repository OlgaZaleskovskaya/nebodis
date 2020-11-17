import {
  IAuthorApp,
  ICommentRecievedApp,
  IPostRecievedApp,
} from 'src/app/app.model';
import * as AuthorActions from './author.actions';

export interface IAuthorState {
  currentAuthor: IAuthorApp;
  isLoading: boolean;
  posts: any;
  currentPost: IPostRecievedApp;
  currentComments: ICommentRecievedApp[];
}

const initialState: IAuthorState = {
  currentAuthor: null,
  isLoading: false,
  posts: null,
  currentPost: null,
  currentComments: null,
};

export function authorReducer(
  state = initialState,
  action: AuthorActions.AuthorActions
): IAuthorState {
  switch (action.type) {
    case AuthorActions.SET_AUTHOR:
      return {
        ...state,
        currentAuthor: { ...action.payload.author },
        posts: [...action.payload.posts],
      };
    case AuthorActions.GET_COMMENTS:
      const currentPost = {
        ...state.posts.filter((post) => post.id === action.payload)[0],
      };

      return {
        ...state,
        currentPost: currentPost,
      };
    case AuthorActions.SET_COMMENTS:
      return {
        ...state,
        currentComments: [...action.payload],
      };

    default:
      return state;
  }
}
