import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(

  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.body.length == 0) {
            console.log('Something is wrong!');
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        switch (true) {
          case error.status >= 400:
            console.log('No info');
            break;
          case error.status >= 500:
            console.log('Server problems');
            break;
        }

        return throwError(error);
      })
    );
  }
}
