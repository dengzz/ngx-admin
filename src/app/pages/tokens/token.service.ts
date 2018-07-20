import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

const httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TokenService {

   private tokenUrl = '/api/tokens';  // URL to web api

   constructor(private http: HttpClient) { }

   /** GET block from the server */
   getToken(name: string): Observable<any> {
      return this.http.get<any>(this.tokenUrl + "/" + name, httpOptions)
         .pipe(
            tap(list => { }),
            catchError(this.handleError<any>('getToken'))
         );
   }

   /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
   private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

         // TODO: send the error to remote logging infrastructure
         console.log(error); // log to console instead

         // Let the app keep running by returning an empty result.
         return of(result as T);
      };
   }
}