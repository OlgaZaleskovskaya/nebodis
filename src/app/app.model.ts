export interface IAuthorRecievedApp {
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  country: string;
  date_of_birth: string;
  gender: 'male' | ' female';
  email: string;
  phone: string;
  date_created: string;
  id: number;
}

export interface IAuthorApp extends IAuthorRecievedApp {
  age: number;
  posts_count?: number;
}

export interface IPostRecievedApp {
  authorId: number;
  date_created: string;
  id: number;
  text: string;
  title: string;
}

export interface ICommentRecievedApp {
  authorId: number;
  postId: number;
  date_created: string;
  id: number;
  content: string;
  author_first_name?: string;
  author_last_name?: string;
}

export interface GetAuthorsDataParams {
  order: string;
  orderDirection: 'ASC' | 'DESC';
  skip: number;
  limit: number;
  include: IncludeFilter;
  age_from?: number;
  age_to?: number;
  gender?: 'male' | 'female' | '';
  name?: string;
  author_data?: string;
}

export interface RequestFilter {
  skip: number;
  limit: number;
  order: string;
  include?: IncludeFilter;
  /** where filter. being used internally by `getAuthorsData` util function, you don't have to provide it yourself */
  where?: any;
}
export type IncludeFilter = Array<{ relation: string; scope?: RequestFilter }>;

export interface IPage {
  pageIndex: number;
  pageSize: number;
}
