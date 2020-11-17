import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  GetAuthorsDataParams,
  IRecievedAuthor,
  RequestFilter,
} from './authors/authors.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url = environment.api;
  constructor(private http: HttpClient) {}
/*
  getAuthors(data:  GetAuthorsDataParams) {
    const paramFilter = this.getAuthorsData(data);
    console.log('paramFilter', paramFilter);
    return this.http
      .get<Array<any>>(`${this.url}/Authors?filter=${this.serialize1(paramFilter)}`)
      .pipe(
        map((res) => {
          const newArr = res.map((item) => {
            const newItem: IRecievedAuthor = {
              author: { ...item },
              count: null,
            };
            return newItem;
          });
          return newArr;
        })
      );
  } */

  authorsCount() {
    return this.http.get<{ count: number }>(`${this.url}/Authors/count`);
  }

  getAuthorPostCount(id: number) {
    return this.http.get<{ count: number }>(
      `${this.url}/Authors/${id}/posts/count`
    );
  }

  authorsCountFiltered() {
    return this.http.get<{ count: number }>(`${this.url}/Authors/count`);
  }

  getFilteredAuthorsData(params: GetAuthorsDataParams) {
    console.log('params', params);
    const serialized = this.serialize1(this.getAuthorsData(params));
    const request = `${this.url}/Authors?filter=${serialized}`;
    return this.http.get<Array<any>>(request);
  }

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

  getWhereFilter(params: GetAuthorsDataParams): any[] {
    const whereFilter = [];
    if (params.age_from && !isNaN(params.age_from)) {
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
        str.push(
          encodeURIComponent(`"${p}"`) +
            '=' +
            encodeURIComponent(JSON.stringify(obj[p]))
        );
      }
    }
    return str.join('&');
  }
  private serialize1(obj) {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(`"${p}"` + ':' + JSON.stringify(obj[p]));
      }
    }
    return encodeURIComponent(`{${str.join(',')}}`);
  }

  private mySerialize(obj): string {
    let str = '';
    for (const p in obj) {
      str = str + `"${p}":"${obj[p]}",`;
    }
    const newStr = `{${str}}`;
    return encodeURIComponent(
      newStr.slice(0, newStr.length - 2) + newStr.slice(newStr.length - 1)
    );
  }
}
