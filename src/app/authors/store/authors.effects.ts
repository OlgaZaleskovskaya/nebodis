import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, ofType, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, withLatestFrom, tap, map, mergeMap } from 'rxjs/operators';
import { from} from 'rxjs';

import { environment } from '../../../environments/environment';
import * as AuthorsActions from './authors.actions';
import * as AuthorActions from '../../author/store/author.actions';
import * as fromApp from '../../store/app.reducer';

import { IAuthorRecievedApp, IAuthorApp, IPostRecievedApp,  GetAuthorsDataParams } from 'src/app/app.model';

@Injectable()
export class AuthorsEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store$: Store<fromApp.AppState>,
    private router: Router
  ) {}

  @Effect()
  changePages$ = this.actions$.pipe(
    ofType(AuthorsActions.CHANGE_PAGE),
    withLatestFrom(this.store$.select('authors')),
    switchMap((data: Array<any>) => {
      const filters = data[1]['filters'];
      const serialized = this.serialize(this.getAuthorsData(filters));
      const request = `${environment.api}/Authors?filter=${serialized}`;
      const result = this.http.get<Array<IAuthorRecievedApp>>(request).pipe(
        map((res: IAuthorRecievedApp[]) => {
          const authors: IAuthorApp[] = res.map((author) => {
            const result1 = {
              ...author,
              age: this.getAge(author.date_of_birth),
            };
            return result1;
          });
          return new AuthorsActions.SetAuthors(authors);
        })
      );
      return result;
    })
  );

  @Effect()
  countAuthors$ = this.actions$.pipe(
    ofType(AuthorsActions.SET_AUTHORS),
    withLatestFrom(this.store$.select('authors')),
    switchMap((data: Array<any>) => {
      const filters = data[1]['filters'];
      const requestStr = `{"and": ${JSON.stringify(
        this.getWhereFilter(filters)
      )}}`;
      const request = `${
        environment.api
      }/Authors/count?where=${encodeURIComponent(requestStr)}`;
      const result = this.http.get<{ count: number }>(request).pipe(
        map((res) => {
          return new AuthorsActions.SetAuthorsCount(res.count);
        })
      );
      return result;
    })
  );

  @Effect()
  applySortin$ = this.actions$.pipe(
    ofType(AuthorsActions.APPLY_SORTING),
    withLatestFrom(this.store$.select('authors')),
    switchMap((data: Array<any>) => {
      const filters = {
        ...data[1]['filters'],
      };
      const serialized = this.serialize(this.getAuthorsData(filters));
      const request = `${environment.api}/Authors?filter=${serialized}`;
      const result = this.http.get<Array<IAuthorRecievedApp>>(request).pipe(
        map((res: IAuthorRecievedApp[]) => {
          const authors: IAuthorApp[] = res.map((author) => {
            const result1 = {
              ...author,
              age: this.getAge(author.date_of_birth),
            };
            return result1;
          });
          return new AuthorsActions.SetAuthors(authors);
        })
      );
      return result;
    })
  );

  @Effect()
  applyFilter$ = this.actions$.pipe(
    ofType(AuthorsActions.APPLY_FILTER),
    withLatestFrom(this.store$.select('authors')),
    switchMap((data:Array<any>) => {
      const filters = {
        ...data[1]['filters'],
      };
      const serialized = this.serialize(this.getAuthorsData(filters));
      const request = `${environment.api}/Authors?filter=${serialized}`;
      const result = this.http.get<Array<IAuthorRecievedApp>>(request).pipe(
        map((res: IAuthorRecievedApp[]) => {
          const authors: IAuthorApp[] = res.map((author) => {
            const result1 = {
              ...author,
              age: this.getAge(author.date_of_birth),
            };
            return result1;
          });
          return new AuthorsActions.SetAuthors(authors);
        })
      );
      return result;
    })
  );
  @Effect()
  getAuthorsPostsCount$ = this.actions$.pipe(
    ofType(AuthorsActions.SET_AUTHORS),
    switchMap((data) => {
      const authorsId = (data['payload'] as Array<any>).map((item) => item.id);
      const result = from(authorsId).pipe(
        mergeMap((id) => {
          return this.http
            .get<{ count: number }>(
              `${environment.api}/Authors/${id}/posts/count`
            )
            .pipe(
              map((res) => {
                return new AuthorsActions.SetPostsCount({
                  id: id,
                  posts_count: res.count,
                });
              })
            );
        })
      );
      return result;
    })
  );

  @Effect()
  getAuthor$ = this.actions$.pipe(
    ofType(AuthorsActions.GET_AUTHOR),
    switchMap((id: { payload: number }) => {
      const request1 = `${environment.api}/Authors/${id.payload}`;
      const request2 = `${environment.api}/Authors/${id.payload}/posts`;

      const obs1$ = this.http.get<any>(request1);
      const obs2$ = this.http.get<any>(request2);

      return obs1$.pipe(
        mergeMap((authorData) => {
          return obs2$.pipe(
            map((posts: IPostRecievedApp[]) => {
              const auth: IAuthorApp = {
                ...authorData,
                age: this.getAge(authorData.date_of_birth),
              };

              return new AuthorActions.SetAuthor({
                author: auth,
                posts: posts,
              });
            }),
            tap((res) => this.router.navigateByUrl('/author'))
          );
        })
      );
    })
  );

  private getAuthorsData(params: GetAuthorsDataParams) {
    const whereFilter = this.getWhereFilter(params);
    return {
      ...(whereFilter.length ? { where: { and: whereFilter } } : {}),
      order: params.order + ' ' + params.orderDirection.toUpperCase(),
      skip: params.skip || 0,
      limit: params.limit || 0,
      include: params.include,
    };
  }

  private getWhereFilter(params: GetAuthorsDataParams): any[] {
    const whereFilter = [];
    if (params.age_from && !isNaN(params.age_from)) {
      console.log('params age from', params.age_from);
      whereFilter.push({
        date_of_birth: {
          lt: new Date().setFullYear(
            new Date().getFullYear() - params.age_from
          ),
        },
      });
    }
    if (params.age_to && !isNaN(params.age_to)) {
      whereFilter.push({
        date_of_birth: {
          gt: new Date().setFullYear(new Date().getFullYear() - params.age_to),
        },
      });
    }
    if (params.gender) {
      whereFilter.push({
        gender: params.gender,
      });
    }
    if (params.name) {
      params.name
        .split(' ')
        .filter(Boolean)
        .map((element) => {
          whereFilter.push({
            or: [
              { first_name: { ilike: `${element.toLowerCase()}%` } },
              { last_name: { ilike: `${element.toLowerCase()}%` } },
            ],
          });
        });
    }
    if (params.author_data) {
      params.author_data
        .split(' ')
        .filter(Boolean)
        .map((element) => {
          whereFilter.push({
            or: [
              { email: { ilike: `%${element.toLowerCase()}` } },
              { phone: { ilike: `%${element.toLowerCase()}` } },
              { address: { ilike: `%${element.toLowerCase()}` } },
              { country: { ilike: `%${element.toLowerCase()}` } },
              { city: { ilike: `%${element.toLowerCase()}` } },
            ],
          });
        });
    }

    return whereFilter;
  }

  private serialize(obj) {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(`"${p}"` + ':' + JSON.stringify(obj[p]));
      }
    }
    return encodeURIComponent(`{${str.join(',')}}`);
  }

  private getAge(date: string): number {
    return Math.floor(
      (-new Date(date).getTime() + new Date().getTime()) /
        (1000 * 60 * 60 * 24 * 365)
    );
  }
}
