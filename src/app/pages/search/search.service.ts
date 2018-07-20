import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { SearchData } from './searchs';

const httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class SearchService {

   private searchUrl = '/api/search';  // URL to web api

   constructor(private http: HttpClient) { }

   /** GET account from the server */
   search(keyword: string): Observable<SearchData> {
      return this.http.get<SearchData>(this.searchUrl + "?keyword=" + keyword, httpOptions)
         .pipe(
            tap(list => { }),
            catchError(this.handleError<SearchData>('search')),
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