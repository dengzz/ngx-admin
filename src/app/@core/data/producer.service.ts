import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { ProducerList } from './producers';

const httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class ProducerService {

   private producersUrl = '/api/producers';  // URL to web api

   constructor(private http: HttpClient) { }

   /** GET heroes from the server */
   getProducers(): Observable<ProducerList> {
      return this.http.get<ProducerList>(this.producersUrl, httpOptions)
         .pipe(
            tap(list => { }),
            catchError(this.handleError<ProducerList>('getProducers')),
      );
   }

   getTop(): Observable<any> {
      return this.http.get<any>(this.producersUrl + '/top', httpOptions)
         .pipe(
            tap(list => { }),
            catchError(this.handleError<any>('getTop')),
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
